import React from "react";
import { Link } from "react-router-dom";
import "./UserEvents.css";

export default function UserEvents(props) {
  return props.events.map(e => (
    <li key={e.id}>
      <Link to={`/events/${e.id}`} className="dashboard-user-event-card-item">
        <h3>{e.title}</h3>
        <span>
          <i className="fas fa-map-marked-alt" /> {e.location}
        </span>
        <span>
          <i className="far fa-calendar-alt" /> {e.event_date}
        </span>
      </Link>
    </li>
  ));
}
