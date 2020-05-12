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
      data: null,
    };
  }
  getWeather = () => {
    const { tempType } = this.state;
    return new Promise((res, rej) => {
      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=13.252818&lon=-61.197096&exclude=minuet&units=${tempType}&appid=aafb9fc8c313b42a1056f4a6c9af96ea`,
        {}
      ).then((res) => {
        !res.ok
          ? res.json().then((err) => this.setState({ error: err }))
          : res.json().then((data) => {
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
            lengthType: "mph",
          },
          () => {
            this.getWeather();
            this.getHourly();
          }
        )
      : this.setState(
          {
            tempType: "metric",
            degType: "C",
            notCurrDegType: "imperial",
            lengthType: "meters/sec",
          },
          () => {
            this.getWeather();
            this.getHourly();
          }
        );
  };
  componentDidMount() {
    this.getWeather();
  }
  msToTime = (unix_timestamp) => {
    const date = new Date(unix_timestamp * 1000);

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

  getHourly = () => {
    const { data } = this.state;
    const weatherInfo = data.daily;
    return weatherInfo.map((info, i) => {
      if (i > 4) {
        return;
      }
      let day = new Date(info.dt);
      day = day.getDay();
      return (
        <li className="daily-weather" key={i}>
          <img
            src={`https://openweathermap.org/img/wn/${info.weather[0].icon}@2x.png`}
            alt="weather icon"
            className="weather-icon"
          />
          <span>{info.weather[0].description} </span>
          <span>Date: {day}</span>
          <span>
            {info.temp.day}˚{this.state.degType}
          </span>
          <span>
            Sunrise:{" "}
            {new Date(info.sunrise).getHours() +
              ":" +
              new Date(info.sunrise).getMinutes()}
          </span>
          <span>
            Sunset:{" "}
            {new Date(info.dt).getHours() +
              ":" +
              new Date(info.dt).getMinutes()}
          </span>
        </li>
      );
    });
  };

  render() {
    const weather = this.state.data;
    return (
      <section className="weather-wrapper">
        {weather ? (
          <>
            <section className="weather-widget">
              <span id="change-unit" onClick={this.handleMeasureChange}>
                <h3 className="dashboard-header-link">Current Weather</h3>
                Change unit to {this.state.notCurrDegType}
              </span>
              <aside>
                <span>
                  <img
                    alt={weather.current.weather[0].main}
                    src={`https://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`}
                  />
                  <p id="weather-widget-p">
                    {weather.current.weather[0].description}
                  </p>
                </span>
                <span>
                  <h3>
                    {weather.current.temp}°{this.state.degType}
                  </h3>
                  <p>
                    Feels like {weather.current.feels_like}°{this.state.degType}
                  </p>
                  <h5>
                    HI {weather.daily[0].temp.max}°{this.state.degType}
                    <br />
                    LO {weather.daily[0].temp.min}°{this.state.degType}
                    <br />
                  </h5>
                </span>
                <span>
                  <h3>Wind</h3>
                  <p>
                    {weather.current.wind_speed} {this.state.lengthType}
                  </p>
                  <p>{weather.current.wind_deg}°</p>
                </span>
                <span>
                  <h3>Sunrise</h3>
                  {this.msToTime(weather.current.sunrise)}
                  <br />
                  <h3>Sunset</h3>
                  {this.msToTime(weather.current.sunset)}
                </span>
              </aside>
            </section>
            <ul id="weather-daily">{this.getHourly()}</ul>
          </>
        ) : null}
      </section>
    );
  }
}
