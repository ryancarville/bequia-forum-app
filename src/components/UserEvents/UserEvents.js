import React from "react";
import { Link } from "react-router-dom";
import "./UserEvents.css";
import deleteButton from "../Buttons/deleteButton";

export default function UserEvents(props) {
  return (
    <ul id="dash-user-events-ul">
      {props.events.map((e) => (
        <Link to={`/events/${e.id}`} className="dashboard-user-event-card-item">
          <li key={e.id}>
            <h3>{e.title}</h3>
            <span>
              <i className="fas fa-map-marked-alt" /> {e.location}
            </span>
            
            <span>
              <i className="far fa-calendar-alt" /> {e.event_date}
              {deleteButton}
            </span>
          </li>
        </Link>
      ))}
    </ul>
  );
}
