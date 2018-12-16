import React, { Component } from 'react';
import './App.css';
import bg from './bg.jpg';
class App extends Component {
  state = {
    source: '',
    destination: '',
    message: ''
  }

  handleChange = (e) =>{
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) =>{
    e.preventDefault();
    fetch(`https://api.exchangeratesapi.io/latest?base=${this.state.source}&symbols=${this.state.destination}`)
    .then(response=>{
      return response.json();
    }).then(data=>{
      console.log();
      this.setState({
        message: `1 ${this.state.source} is equal to ${Math.round(data.rates[this.state.destination] * 100)/100} ${this.state.destination}`
      })
    })
  }
  render() {
    return (
      <div className="App container">
        <h2 className='blue-text'>Currency Converter</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="input-field col-s12 col-m6">
                <input type="text" onChange={this.handleChange} name='source' placeholder="Source Currency" />
            </div>
          </div>
          <div className="row">
            <div className="input-field col-s12 col-m6">
            <input type="text" onChange={this.handleChange} name="destination" placeholder="Destination Currency"/>        
            </div>
          </div>
          <button type="submit" className='blue black-text btn left'>Convert</button>
          <p className='green-text z-depth-0 '>{this.state.message}</p>
        </form>
      </div>
    );
  }
}

export default App;
