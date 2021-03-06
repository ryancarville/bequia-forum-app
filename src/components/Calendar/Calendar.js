import React, { Component } from "react";
import "./Calendar.css";
import { withRouter } from "react-router-dom";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
const monthsNums = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12"
];
class Calendar extends Component {
  constructor(props) {
    super(props);
    const today = new Date();
    this.state = {
      dayInt: today.getDate(),
      month: today.getMonth(),
      monthNum: monthsNums,
      year: today.getFullYear(),
      prevDay: today.getDate()
    };
  }

  //handle date change
  handleDayChange = (day, events) => {
    const { prevDay } = this.state;
    const lastCell = document.getElementById(`day-${prevDay}`);
    lastCell.classList.remove("currDay");
    this.setState({
      prevDay: day
    });
    const cell = document.getElementById(`day-${day}`);
    cell.classList.add("currDay");
    this.props.handleShowEvents(events);
  };
  //handle move to next month on calendar
  handleClickNext = () => {
    this.setState(({ month, year }) => {
      const newYear = (year = month === 11 ? year + 1 : year);
      const newMonth = (month + 1) % 12;
      return {
        month: newMonth,
        year: newYear
      };
    });
  };
  //handle previous month on calendar
  handleClickPrev = () => {
    this.setState(({ month, year }) => {
      const newYear = month === 0 ? year - 1 : year;
      const newMonth = month === 0 ? 11 : month - 1;
      return {
        month: newMonth,
        year: newYear
      };
    });
  };
  //make calendar
  renderCalendar = () => {
    const today = new Date();
    const { events } = this.props;
    const { dayInt, month, monthNum, year } = this.state;
    const firstDay = new Date(year, month).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const calendarItems = [];
    // render blank days first
    for (let x = 0; x < firstDay; x++) {
      calendarItems.push(<li key={`blank-${x}`} />);
    }
    // render rest

    for (let day = 1; day <= totalDays; day++) {
      //get todays date cell
      const isActive =
        dayInt === day &&
        month === today.getMonth() &&
        year === today.getFullYear();
      // we filter all the events on this day.
      const eventsOnThisDay = events.filter(event => {
        const eventDate = event.event_date.split("-");
        const eventDay = eventDate[2];
        const eventMonth = eventDate[1];
        const eventYear = eventDate[0];
        return (
          day.toString() === eventDay &&
          monthNum[month] === eventMonth &&
          year.toString() === eventYear
        );
      });

      //push all dates with events to calendar array
      calendarItems.push(
        <li
          className={`singleDay ${isActive ? "active" : ""}`}
          key={`day-${day}`}
          id={`day-${day}`}
          onLoad={
            isActive ? () => this.props.handleShowEvents(eventsOnThisDay) : null
          }
          onClick={() => this.handleDayChange(day, eventsOnThisDay)}
        >
          {day}

          {eventsOnThisDay.length > 0 ? (
            <span className="event-marker" key={`event-marker${day}`} />
          ) : null}
        </li>
      );
    }

    return calendarItems;
  };

  render() {
    return (
      <section className="events-calendar-container">
        <div className="calendar-content">
          <div id="calendar">
            <div className="month">
              <ul>
                <li id="prev" onClick={this.handleClickPrev}>
                  &#10094;
                </li>
                <li id="month">{months[this.state.month]}</li>
                <li id="year">{this.state.year}</li>
                <li id="next" onClick={this.handleClickNext}>
                  &#10095;
                </li>
              </ul>
            </div>

            <ul id="weekdays">
              <li>Su</li>
              <li>Mo</li>
              <li>Tu</li>
              <li>We</li>
              <li>Th</li>
              <li>Fr</li>
              <li>Sa</li>
            </ul>
            <ul id="days">{this.renderCalendar()}</ul>
          </div>
          <div id="calendar-legend-container">
            <span className="calender-legend" />
            <p>scheduled event</p>
          </div>
        </div>
      </section>
    );
  }
}

export default withRouter(Calendar);
