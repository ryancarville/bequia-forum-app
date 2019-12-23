import React from "react";
import "./404.css";
//page not found
export default function NoPath() {
  window.scroll(0, 0);
  return (
    <section className="not-found">
      <header>
        <h1>404 Path not Found</h1>
      </header>
      <p>
        <i className="fas fa-umbrella-beach"> Nothing to see here.</i>
        
      </p>
      <img src="/images/windy-palms.gif" alt="plam-tree" />
    </section>
  );
}
