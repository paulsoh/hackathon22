import React, { Component } from 'react';
import './App.css';
import GoogleMapWrapper from './component/GoogleMapWrapper';
import geodist from 'geodist';
import sortBy from 'lodash/sortBy';
import TabMenu from './component/TabMenu';
import LogDataTab from './component/LogDataTab';
import MessageTab from './component/MessageTab';
import { personnel } from './db';
import { generateRandomMovement } from './randomMovement';

const defaultLocation = {
  lat: 37.8236034,
  lng: 127.5970519,
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      centerPosition: defaultLocation, 
      limitRadius: 10,
      personnelPositions: [],
      hoveredPersonnelKey: '',
      activeTab: 'a',
    }
    this.itemsRef = personnel;
  }

  listenForItems = (itemsRef) => {
    itemsRef.on('value', snap => {
      const items = [];
      let sortedItems = [];
      snap.forEach((child) => {
        items.push({
          name: child.val().name,
          position: child.val().position,
          distance: this.getDistance(child.val().position),
          isSafezone: this.isPersonnelSafe(child.val().position),
          _key: child.key
        });
      })

      sortedItems = sortBy(items, [function(item) { return item.distance; }])

      this.setState({
        personnelPositions: sortedItems,
      })
    })
  }

  isPersonnelSafe = (position) => {
    const distance = this.getDistance(position);
    const limitRadius = this.state.limitRadius;
    if (distance > limitRadius) {
      return 'red';
    } else if (distance <= limitRadius && distance >= limitRadius * 0.8 ) {
      return 'purple';
    } else {
      return 'green';
    }
  }

  componentDidMount = () => {
    this.listenForItems(this.itemsRef);
  }
  
  setCenterPosition = (e) => {
    this.setState({
      centerPosition: {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      }
    })
  }

  handleChange = (e) => {
    this.setState({ limitRadius: e.target.value });
  } 

  getDistance = (position) => {
    return geodist({
      lat: this.state.centerPosition.lat,
      lon: this.state.centerPosition.lng,
    }, {
      lat: position.lat,
      lon: position.lng,
    }, {
      unit: 'km',
    })
  }

  handleTabClick = (tabMenu) => () => {
    return this.setState({
      activeTab: tabMenu,
    })
  }

  renderLocationStatus = () => (
    <div>
      <table className="ui celled striped table">
        <thead>
          <tr>
            <th colSpan="2">
              자대 위치
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="collapsing">
              위도
            </td>
            <td className="collapsing">
              {Math.round(this.state.centerPosition.lat * 1000) / 1000}
            </td>
          </tr>
          <tr>
            <td>
              경도
            </td>
            <td>
              {Math.round(this.state.centerPosition.lng * 1000) / 1000}
            </td>
          </tr>
        </tbody>
      </table>
      <h5>
        반경 설정 하기
      </h5>
      <div className="ui input">
        <input type="text" value={this.state.limitRadius} onChange={this.handleChange} />
      </div>
      <h5>
        병사 관리
      </h5>

      <table className="ui selectable celled table">
        <thead>
          <tr>
            <th>이름</th>
            <th>자대로부터의 거리 (km)</th>
            <th>위치(위도)</th>
            <th>위치(경도)</th>
          </tr>
        </thead>
        <tbody>
          {this.state.personnelPositions.map(person => ( 
            <tr 
              className={`${person.isSafezone === 'red' ? 'negative' : ''}`}
              key={person._key}
              onMouseLeave={() => { this.setState({
                hoveredPersonnelKey: '',
              })}}
              onMouseOver={() => { this.setState({
                hoveredPersonnelKey: person._key
              })}}
            >
              <td>{person.name}</td>
              <td>{person.distance}</td>
              <td>
                {Math.round(person.position.lat * 1000) / 1000}
              </td>
              <td>
                {Math.round(person.position.lng * 1000) / 1000}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  render() {
    const renderedContent = (activeTab) => {
      if (activeTab === 'a') {
        return this.renderLocationStatus();
      } else if (activeTab === 'b') {
        return (
          <MessageTab 
            recipientList={this.state.personnelPositions.length}
          />
        ) 
      } else {
        return (
          <LogDataTab 
            baseLocation={this.state.centerPosition}
            limitRadius={this.state.limitRadius}
          />
        )
      }
    }
    return (
      <div className="App">
        <h3 
          style={{
            fontSize: '2em',
            paddingTop: '20px',
          }}
        >
          ArmyGo :: 여러분의 감시자

        </h3>
        <button 
          className="ui basic button"
          onClick={generateRandomMovement}
        >
          <i className="icon user" />
          신 모드
        </button>
        <div className="ui hidden divider" />
        <div 
          style={{ 
            height: '80vh', 
            width: '45%', 
            float: 'left',
            paddingLeft: '25px',
          }}
        >
          <GoogleMapWrapper 
            centerPosition={this.state.centerPosition}
            setCenterPosition={this.setCenterPosition}
            limitRadius={this.state.limitRadius}
            personnelPositions={this.state.personnelPositions}
            hoveredPersonnelKey={this.state.hoveredPersonnelKey}
          />
        </div>
        <div 
          style={{
            float: 'left',
            width: '45%',
            paddingLeft: '25px',
            overflow: 'scroll',
          }}
        >
          <div className="ui container">
            <TabMenu
              handleTabClick={this.handleTabClick}
              activeTab={this.state.activeTab}
            >
              {renderedContent(this.state.activeTab)}
            </TabMenu>
          </div>
        </div>
      </div>
    );
  }
}


export default App;
