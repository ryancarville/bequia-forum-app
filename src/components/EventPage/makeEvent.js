import React from "react";
import formatDate from "../../helpers/formatDate";

export default function MakeEvent(props) {
  const e = props.event;
  return (
    <article className="event-page-content" key={e.id}>
      <span key={e.id}>
        <h3>{e.title}</h3>
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
      </span>
      <p id="event-description">{e.description}</p>
    </article>
  );
}
