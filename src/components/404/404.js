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
      <img
        src="https://media.giphy.com/media/fGOAbNrp0WtctLULQV/source.gif"
        alt="plam-tree"
      />

      <p>
        You must have had to many pina coladas and mistyped or this path is
        still under construction. <br />
        Check back later.
      </p>
    </section>
  );
}
