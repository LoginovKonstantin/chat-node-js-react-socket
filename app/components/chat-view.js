const React = require('react');
const Component = React.Component;
const ReactDOM = require('react-dom');
const Cookie = require('../cookie');
const io = require('socket.io-client');
const noty = require('noty');
const $ = require('jquery');

let socket;

class ChatView extends Component{

  constructor(){
    super();
    this.state = {
      messages: [],
      message: ''
    };
  }

  componentDidMount(){
    socket = io();
    socket.on('allMessages', allMessages => {
      this.setState({messages: allMessages});
      this.listScrollDown();
    })
    socket.on('message', mess => {
      this.setState({messages: this.state.messages.concat(mess)});
      this.listScrollDown();
    })
    socket.on('newUser', name => {
      let n =noty({
        layout: 'topRight',
        text: name + ' connected',
        animation: {
          open: {height: 'toggle'},
          close: {height: 'toggle'},
        },
        timeout: 1000,
        maxVisible: 2
      });
    })
    socket.on('exitUser', name => {
      let n =noty({
        layout: 'topRight',
        text: name + ' disconnected',
        animation: {
          open: {height: 'toggle'},
          close: {height: 'toggle'},
        },
        timeout: 1000,
        maxVisible: 2
      });
    })
  }

  listScrollDown(){
    $("#block-messages").animate({ scrollTop: $('#block-messages').prop("scrollHeight")}, 800);
  }

  handleMessage(text){
    this.setState({message: text});
  }

  handleOnKey(keyCode){
    if(keyCode === 13 && this.state.message.length > 0){
      this.sendMessage(Cookie.getCookie('nameInChatByKot'), this.state.message);
    }
  }

  handleOnClick(){
    if(this.state.message.length > 0){
      this.sendMessage(Cookie.getCookie('nameInChatByKot'), this.state.message);
    }
  }

  sendMessage(name, message){
    this.listScrollDown();
    socket.emit('message', {name, message})
    this.setState({ message: ''});
  }

  render(){
    const messages = this.state.messages.map((el, index) => {
      return (
        <div key = {index} className = 'message'>
          <h4>
            {el.name}
            <span className = 'time-style'> ({el.time})</span>
          </h4>
          {el.message}
        </div>
      )
    })
    return(
      <div className = 'container'>
        <div className = 'jumbotron chat-view'>
          <div id = 'block-messages' className = 'messages'>{messages}</div>
          <div className = 'input-group'>
            <input
              type = 'text'
              className = 'form-control'
              placeholder = 'Enter message...'
              onChange = {e => {this.handleMessage(e.target.value)}}
              onKeyUp = {e => this.handleOnKey(e.keyCode)}
              value = {this.state.message}
              autoFocus
              />
            <span className = 'input-group-btn'>
              <button
                className = 'btn btn-default'
                type = 'button'
                onClick = {() => this.handleOnClick()}>
                Send
              </button>
            </span>
          </div>
        </div>
      </div>
    )
  }
}

module.exports = ChatView
