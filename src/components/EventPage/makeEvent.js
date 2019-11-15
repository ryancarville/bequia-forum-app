import React from "react";
import formatDate from "../../helpers/formatDate";

export default function MakeEvent(props) {
  const e = props.event;
  return (
    <article className="event-page-content" key={e.id}>
      <span key={e.id}>
        <h3>{e.title}</h3>
        <p>Where: {e.location}</p>
        <p>When: {formatDate(e.event_date)}</p>
        <p>Time: {e.event_time}</p>
      </span>
      <p id="event-description">{e.description}</p>
    </article>
  );
}
