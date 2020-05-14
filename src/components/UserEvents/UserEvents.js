import React from "react";
import { Link } from "react-router-dom";
import "./UserEvents.css";

export default function UserEvents(props) {
  return (
    <ul id="dash-user-events-ul">
      {props.events.map((e) => (
        <Link
          to={`/events/${e.id}`}
          key={e.id}
          className="dashboard-user-event-card-item"
        >
          <li key={e.id}>
            <h3>{e.title}</h3>
            <span>
              <i className="fas fa-map-marked-alt" /> {e.location}
            </span>

            <span>
              <i className="far fa-calendar-alt" /> {e.event_date}
            </span>
          </li>
        </Link>
      ))}
    </ul>
  );
}
