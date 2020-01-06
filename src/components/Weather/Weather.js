import React, { Component } from "react";
import "./Weather.css";

export default class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tempType: "metric",
      degType: "C",
      notCurrDegType: "imperial",
      lengthType: "m/s",
      data: null
    };
  }
  getWeather = () => {
    const { tempType } = this.state;
    return new Promise((res, rej) => {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?id=3577844&appid=aafb9fc8c313b42a1056f4a6c9af96ea&units=${tempType}`,
        {}
      ).then(res => {
        !res.ok
          ? res.json().then(err => this.setState({ error: err }))
          : res.json().then(data => {
              console.log(data);
              this.setState({ data: data });
            });
      });
    });
  };
  handleMeasureChange = () => {
    const { tempType } = this.state;

    tempType === "metric"
      ? this.setState(
          {
            tempType: "imperial",
            degType: "F",
            notCurrDegType: "metric",
            lengthType: "mph"
          },
          () => {
            this.getWeather();
          }
        )
      : this.setState(
          {
            tempType: "metric",
            degType: "C",
            notCurrDegType: "imperial",
            lengthType: "meters/sec"
          },
          () => {
            this.getWeather();
          }
        );
  };
  componentDidMount() {
    this.getWeather();
  }
  msToTime = unix_timestamp => {
    const date = new Date(unix_timestamp * 1000);
    console.log(date);
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();
    hours = hours - 5;
    // Will display time in 10:30:23 format
    var formattedTime =
      hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
    return formattedTime;
  };
  render() {
    const weather = this.state.data;
    console.log(weather);
    return (
      <section className="weather-wrapper">
        <span id="change-unit" onClick={this.handleMeasureChange}>
          Change unit to {this.state.notCurrDegType}
        </span>
        {weather ? (
          <aside className="weather-widget">
            <span>
              <img
                alt={weather.weather[0].main}
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              />
              <p id="weather-widget-p">{weather.weather[0].description}</p>
            </span>
            <span>
              <h3>
                {weather.main.temp}°{this.state.degType}
              </h3>
              <p>
                Feels like {weather.main.feels_like}°{this.state.degType}
              </p>
              <h5>
                HI {weather.main.temp_max}°{this.state.degType}
                <br />
                LO {weather.main.temp_min}°{this.state.degType}
                <br />
              </h5>
            </span>
            <span>
              <h3>Wind</h3>

              <p>
                {weather.wind.speed} {this.state.lengthType}
              </p>

              <p>{weather.wind.deg}°</p>
            </span>
            <span>
              <h3>Sunrise</h3>
              {this.msToTime(weather.sys.sunrise)}
              <br />
              <h3>Sunset</h3>
              {this.msToTime(weather.sys.sunset)}
            </span>
            <br />
          </aside>
        ) : null}
      </section>
    );
  }
}
