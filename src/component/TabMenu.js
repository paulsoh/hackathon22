import React, { PropTypes, Component } from 'react'

class TabMenu extends Component {

  render() {
    return (
      <div>
        <div className="ui top attached tabular menu">
          <a 
            className={`item ${this.props.activeTab === 'a' ? 'active' : ''}`}
            onClick={this.props.handleTabClick('a')}
          >
            위치 확인
          </a>
          <a 
            className={`item ${this.props.activeTab === 'b' ? 'active' : ''}`}
            onClick={this.props.handleTabClick('b')}
          >
            알림 기능
          </a>
          <a 
            className={`item ${this.props.activeTab === 'c' ? 'active' : ''}`}
            onClick={this.props.handleTabClick('c')}
          >
            로그 관리
          </a>
        </div>
        <div className="ui bottom attached segment">
          <div className="ui hidden divider" />
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default TabMenu;
