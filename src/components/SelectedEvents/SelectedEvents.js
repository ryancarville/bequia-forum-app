import React, { Component } from "react";
import "./SelectedEvents.css";
import { Link } from "react-router-dom";
import formatDate from "../../helpers/formatDate";
//all events on selected day user wants to see
export default class SelectedEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: this.props.events
    };
  }
  //make all events listings for the day
  makeEvents = events => {
    return events.map(e => (
      <div className="calendar-event" key={e.id}>
        <Link to={`/events/${e.id}`}>{e.title}</Link>
        <p>
          <i
            className="fas fa-map-marked-alt"
            samesite="none"
            secure="true"
          ></i>{" "}
          {e.location}
        </p>
        <p>
          <i className="far fa-calendar-alt" samesite="none" secure="true"></i>{" "}
          {formatDate(e.event_date)}
        </p>
        <p>
          <i className="far fa-clock" samesite="none" secure="true"></i>{" "}
          {e.event_time}
        </p>
      </div>
    ));
  };
  render() {
    return (
      <section className="calendar-events-container">
        {this.makeEvents(this.state.events)}
      </section>
    );
  }
}
