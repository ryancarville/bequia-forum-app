import React from "react";
import { Link } from "react-router-dom";
import "./ThisWeek.css";
import formatDate from "../../helpers/formatDate";

export default function ThisWeek(props) {
  const makeEvents = events => {
    return events.map(e => {
      return (
        <div className="event" key={e.id}>
          <span>
            <Link to={`/events/${e.id}`}>{e.title}</Link>
            <p>Where: {e.location}</p>
            <p>When: {formatDate(e.event_date)}</p>
            <p>Time: {e.event_time}</p>
          </span>
          <p>{e.description}</p>
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
