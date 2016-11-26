import React, { PropTypes, Component } from 'react'
import { logData, personnel } from '../db';
import geodist from 'geodist';
import moment from 'moment';

const getDistance = (position1, position2) => {
  return geodist(
    position1,
    position2,
    { unit: 'km' }
  )
}

class LogDataTab extends Component {
  constructor(props) {
    super(props);
    this.itemsRef = logData;
    this.personnelRef = personnel;
    this.state = {
      loggedData: [],
    }
  }

  componentDidMount = () => {
    this.listenForItems(this.itemsRef);
  }

  listenForItems = (itemsRef) => {
    itemsRef.on('value', snap => {
      const items = [];
      snap.forEach((child) => {
        items.push({
          name: child.val().name,
          startTime: child.val().startTime,
          endTime: child.val().endTime,
          reportTime: child.val().reportTime,
          _key: child.key
        });
      })
      this.setState({
        loggedData: items
      })
    })
  }

  deleteLogItem = (key, name) => () => {
    this.personnelRef.child(name).set(null);
    this.itemsRef.child(key).set(null);
    return;
  }

  render() {
    return (
      <div>
        <table className="ui celled striped table">
          <thead>
            <tr>
              <th colSpan="5">
                외출/외박 로그 관리
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="collapsing">
                군번
              </td>
              <td className="collapsing">
                시작 시간
              </td>
              <td className="collapsing">
                중간 보고 현황
              </td>
              <td className="collapsing">
                종료 시간
              </td>
              <td className="collapsing">
              </td>
            </tr>
            {this.state.loggedData.map(item => {
              const isDeletable = item.reportTime && item.startTime && item.endTime;
              const limitRadius = this.props.limitRadius;
              let reportTime = [];
              let renderStatus = '';
              if (item.reportTime) {
                reportTime = Object.keys(item.reportTime)
                renderStatus = (time) => {
                  const distance = getDistance(
                    this.props.baseLocation,
                    item.reportTime[time]
                  )

                  if (distance > limitRadius) {
                    return 'red';
                  } else { 
                    return 'green';
                  }
                }
              }

              return (
                <tr key={item._key}>
                  <td>{item.name}</td>
                  <td>{item.startTime && moment(item.startTime).format('YYYY-MM-DD')}</td>
                  <td>{reportTime && reportTime.map(
                    timestamp => (
                      <a 
                        key={timestamp}
                        className={`ui ${renderStatus(timestamp)} empty circular label`} 
                      />

                    )
                  )}</td>
                  <td>{item.endTime && moment(item.endTime).format('YYYY-MM-DD')}</td>
                  <td>
                    {
                      isDeletable ? (
                        <div 
                          onClick={this.deleteLogItem(item._key, item.name)}
                          className="ui button small"
                        >
                          삭제
                        </div>
                      ) : null
                    }
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

LogDataTab.propTypes = {

};

export default LogDataTab;
