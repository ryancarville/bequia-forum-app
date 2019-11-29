import React from "react";
import { Link } from "react-router-dom";
import "./ThisWeek.css";
import formatDate from "../../helpers/formatDate";

export default function ThisWeek(props) {
  const makeEvents = events => {
    return events.map(e => {
      return (
        <div className="event" key={e.id}>
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
            <i
              className="far fa-calendar-alt"
              samesite="none"
              secure="true"
            ></i>{" "}
            {formatDate(e.event_date)}
          </p>
          <p>
            <i className="far fa-clock" samesite="none" secure="true"></i>{" "}
            {e.event_time}
          </p>
        </div>
      );
    });
  };

  return (
    <div className="thisWeek-container">
      <div className="thisWeek-content">{makeEvents(props.events)}</div>
    </div>
  );
}
