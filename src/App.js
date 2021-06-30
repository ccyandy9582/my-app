import logo from './logo.svg';
import './App.css';
import React from 'react';

class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = {name: ''}
  }
  nameOnChange = (event) => {
    this.setState({name: event.target.value})
  }
  onSubmit = (event) => {
    alert('Name: '+this.state.name)
  }
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <NameField onChange={this.nameOnChange}/>
          <button type='submit'>Submit</button>
        </form>
      </div>
    )
  }
}

class NameField extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <label>Name: </label>
        <input onChange={this.props.onChange} />
      </div>
    )
  }
}

function App() {
  <Form />
}

export default App;
