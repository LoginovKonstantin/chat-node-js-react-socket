const React = require('react');
const Component = React.Component;
const Entrance = require('./entrance');
const ChatView = require('./chat-view');
const Cookie = require('../cookie');
const $ = require('jquery');

class Main extends Component {

  constructor(){
    super();
    this.state = {name: '', errorName: false};
  }

  handleName(name){
    this.setState({name});
    if(name.length > 2 && /^[a-zA-Z0-9а-яА-Я]+$/.test(name)){
      this.setState({errorName: false})
    }else{
      this.setState({errorName: true})
    }
  }

  onEntrance(name){
    if(!this.state.errorName){
      $.get( "/entrance", {name}, (resp) => {
        if(resp == 'not access'){
          this.setState({errorName: true})
        }else{
          Cookie.setCookie(name);
          this.setState({errorName: false})
        }
      })
    }
  }

  render(){
    if(Cookie.getCookie('nameInChatByKot')){
      return (
        <div className = 'app'>
          <ChatView name = {this.state.name}/>
        </div>)
    }else{
      return (
        <div className = 'app'>
          <Entrance
            callbackHandleName = {name => this.handleName(name)}
            callbackEntrance = {() => {this.onEntrance(this.state.name)}}
            errorName = {this.state.errorName} />
        </div>)
    }
  }
}

module.exports = Main
