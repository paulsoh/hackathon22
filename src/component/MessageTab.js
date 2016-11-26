import React, { PropTypes, Component } from 'react'
import { messages } from '../db';
import moment from 'moment';

class MessageTab extends Component {
  constructor(props) {
    super(props);
    this.itemsRef = messages;
    this.state = {
      message: '',
    }
  }

  handleValueChange = (e) => {
    this.setState({
      message: e.target.value,
    })
  }

  sendMessage = () => {
    const sentTime = moment().format();
    this.itemsRef.update({
      [sentTime]: {
        body: this.state.message,
      }
    })
    this.refs.textInput.value = '';
  }

  render() {
    return (
      <div>
        <div className="ui divider hidden"/>
        <h5>
          현재 외출/외박 중인&nbsp;
          {this.props.recipientList}명
          에게 알림 메세지를 보냅니다.
      </h5>
      <div className="ui divider hidden"/>
      <div className="ui divider hidden"/>
      <div className="ui divider hidden"/>
      <div className="ui fluid huge icon input">
        <input 
          type="text" 
          placeholder="메세지를 입력해주세요" 
          onChange={this.handleValueChange}
          ref="textInput"
        />
        <div 
          className="ui huge button"
          onClick={this.sendMessage}
        >
          <i className="send icon" />
          전송
        </div>
      </div>
      <div className="ui divider hidden"/>
    </div>
    );
  }
}

MessageTab.propTypes = {

};

export default MessageTab;
