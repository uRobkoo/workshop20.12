import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: ""

    };
  }
  componentDidMount() {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=Vendryně&units=metric&APPID=822fc8446f5adc72ac8c766a871329a8")
      .then(response => response.json())
      .then(result => {
        if (result.cod !== "404") {
          this.setState({ weather: result })
        }
      })
  }

  handlerWeatherChange = (e) => {
    if (e.key === "Enter") {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.query}&units=metric&APPID=822fc8446f5adc72ac8c766a871329a8`)
          .then(response => response.json())
          .then(result => {
            if (result.cod !== "404") {
              this.setState({ weather: result })
              this.setState({query: ""})
            }
          })

    }

  }


  render() {
    if (!this.state.weather) return <p>Loading...</p>
    return (
      <div className="App" >

        <input className="locationInput" type="text" placeholder='Location...' value={this.state.query} onChange={e => this.setState({ query: e.target.value })} onKeyPress={this.handlerWeatherChange} />

        <div className="container">
          <div className="location">
            {this.state.weather.name}, {this.state.weather.sys.country}
          </div>
          <div className="weather">
            {this.state.weather.weather[0].main}
          </div>
        </div>
        <div className="container2">
          <div className="degrees">
            {Math.round(this.state.weather.main.temp)}°C
          </div>
        </div>
      </div>
    )
  }
}

export default App;
