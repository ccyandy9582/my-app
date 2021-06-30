import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import PropTypes from 'prop-types'

class Hello extends React.Component {
  render() {
    return <h1>Hello {this.props.name}</h1>
  }
}

class AlertBtn extends React.Component {
  render() {
    return (
      <button onClick={this.props.handleClick}>Hello</button>
    )
  }
}
class Pressed extends React.Component {
  handleClick() {
    alert("pressed")
  }
  render() {
    return (
      <AlertBtn handleClick={this.handleClick} />
    )
  }
}

// porps component
class Profile extends React.Component {
  // set a default value for the props which is not required
  static defaultProps = {
    age: 0,
    email: "default"
  }
  // to validate the input data
  static propTypes = {
    name: PropTypes.string.isRequired,
    age: PropTypes.number,
    email: PropTypes.string
  }

  render() {
    return (
      <span>hello {this.props.name}, you are aged {this.props.age}, your email is {this.props.email}</span>
    )
  }
}

// state component
class ColorChanger extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      text: "",
      color: "gray"
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      text: event.target.value, 
      color: event.target.value
    })
  }
  handleSubmit(event) {
    event.preventDefault()
    this.setState({
      color: this.state.text
    })
  }
  render() {
    const inputStyle = {color: this.state.color, marginTop: 20}
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input 
            onChange = {this.handleChange}
            value = {this.state.text}
            style = {inputStyle}
          />
          <button style={{marginLeft: 10}} id="btn">Enter</button>
        </form>
      </div>
    )
  }
}
// to sum up the different between props and states, props is the sourse of the data and state reponsible for reaction to the user.

// virtual DOM
let liFac = React.createFactory('li')
let li1 = React.createElement('li', {key: 'fruit01'}, 'Apple')
let li2 = React.createElement('li', {key: 'fruit02'}, 'Banana')
let li3 = liFac({key: 'fruit03'}, 'Pieapple')
let list1 = React.createElement('ul', {className: 'fruits'}, [li1, li2, li3])
let list2 = <ul className="fruit">
              <li>aaa</li>
              <li>bbb</li>
              <li>ccc</li>
              <li>ddd</li>
            </ul>

// register event by using bind
class BindGreeting extends React.Component {
  constructor(props) {
    super(props)
    this.state = {message: "hello Bind!"}
    this.onClick = this.onClick.bind(this)
  }
  onClick() {
    alert(this.state.message)
  }
  render() {
    return (
      <button onClick={this.onClick}>
        Bind
      </button>
    )
  }
}

// register event by using arrow function
class ArrowGreeting extends React.Component {
  constructor(props) {
    super(props)
    this.state = {message: 'hello Arrow'}
  }
  onClick() {
    alert(this.state.message)
  }
  render() {
    return (
      <button onClick={(event)=>this.onClick(event)}>Arrow</button>
    )
  }
}

//register event by using initial syntax
class InitialGreeting extends React.Component {
  constructor(props) {
    super(props)
    this.state = {message: 'hello initial syntax'}
  }
  onClick = () => {
    alert(this.state.message)
  }
  render() {
    return (
      <button onClick={this.onClick}>initial syntax</button>
    )
  }
}

// event pooling - do not access the SyntheticEvent by async
class PoolGreeting extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      message: 'hello world'
    }
  }
  onClick = (event) => {
    alert("1. "+event.type) //click
    const eventType = event.type
    setTimeout(()=>{
      alert("2. "+event.type) //null
      alert("3. "+eventType)  //click
    }, 10)
  }
  render() {
    return (
      <button onClick={this.onClick}>
        click me!
      </button>
    )
  }
}

// DOM event flow: capture and bubble
class MyBtn extends React.Component {
  constructor(props) {
    super(props)
  }
  onClick = (event) => {
    var PHASE = ['', 'capturing', 'at_target', 'bubbling']
    var eventName = event.type,
        targetID = event.target.id,
        currentTargetID = event.currentTarget.id,
        phase = event.eventPhase,
        text = `Event: ${eventName}\nSource: ${targetID}\nPhase: ${PHASE[phase]}`+`\nHandler Executed at: ${currentTargetID}`
  
    alert(text)
    // to stop the bubbling
    // event.stopPropagation()
    // return false - the way to stopPropagation and preventDefault
  }
  render() {
    return(
      <div id='top' onClick={this.onClick}>
        <div id='middle' onClick={this.onClick}>
          <button type='button' id='btn' onClick={this.onClick}>event flow</button>
        </div>
      </div>
    )
  }
}

// state update
class OnOffSwitch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {isOn: true}
  }

  onClick = (event) => {
    this.setState(() => ({
      isOn: !this.state.isOn
    }))
  }
  render() {
    return (
      <button onClick={this.onClick}>
        {this.state.isOn? 'on': 'off'}
      </button>
    )
  }
}

// controlled component - set the form value(s) by props
class ControlledInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {text: ''}
  }
  onChange = (event) => {
    this.setState({text: event.target.value})
  }
  onSubmit = (event) => {
    alert(`Text: ${this.state.text}`)
    event.preventDefault()
  }
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          Text (controlled): <textarea value={this.state.text} onChange={this.onChange} defaultValue='controlled'/>
          <button type='submit'>Submit</button>
        </form>
      </div>
    )
  }
}

// uncontrolled component - set the form value(s) by DOM, in other words, a component without value or checked attribute
class UncontrolledInput extends React.Component {
  constructor(props) {
    super(props)
  }
  onSubmit = (event) => {
    const text = this.textInput.value
    alert(`Text: ${text}`)
    event.preventDefault()
  }
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          Text (uncontrolled): <input ref={(input)=>{this.textInput = input}} onChange={event => this.setState({text: event.target.text.toUpperCaser()})} defaultValue='uncontrolled'/>
          <button type='submit'>Submit</button>
        </form>
      </div>
    )
  }
}

ReactDOM.render(
  <React.StrictMode>
    <div style = {{margin: 10+'%'}}>
      {/* <App /> */}
      <Hello name="React!" />
      <Pressed /><br />
      <Profile name="andy" age={18} />
      <ColorChanger />
      {list1}
      {list2}
      <BindGreeting />
      <ArrowGreeting />
      <InitialGreeting /><br/>
      <PoolGreeting /><br/>
      <MyBtn />
      <OnOffSwitch />
      <ControlledInput />
      <UncontrolledInput />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
