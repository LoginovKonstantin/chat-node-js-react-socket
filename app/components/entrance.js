const React = require('react');
const Component = React.Component;


class Entrance extends Component{

  render(){
    const styleNameInput = this.props.errorName ? 'input-sign form-control error' : 'input-sign form-control'
    return(
      <div className = 'form-signin container'>
        <h1 className = 'cover-heading'>Welcome</h1>
        <input
          type = 'text'
          className = {styleNameInput}
          placeholder = 'Enter name...'
          maxLength = {15}
          onChange = {(e) => this.props.callbackHandleName(e.target.value)}
          autoFocus>
        </input>
        <a
          href = '#'
          className = 'btn btn-lg btn-default btn-sign'
          onClick = {() => this.props.callbackEntrance()}>
          Entrance
        </a>
      </div>
    )
  }

}

module.exports = Entrance
