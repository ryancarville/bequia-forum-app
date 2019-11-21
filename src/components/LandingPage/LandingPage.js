import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <section className="landingPage-container">
      <div className="landingPage-content">
        <img
          id="palm-trees"
          src="https://bequiaforum.com/static/media/bequia-island.e276d53c.png"
          alt="palm-trees"
        />
        <div id="landing-page-text">
          <h1>Welcome to Bequia Forum!</h1>
          <article id="landing-page-text-p">
            <h4>A place to connect with locals, travelers and the world.</h4>
            <p>
              You will find message boards on a number of topics, a events
              calender, job listings, market place and rentals section.
              <br /> <Link to="/signup">Create an account</Link> today to get
              the most out of the platform. i.e. Create Posts, events, comments
              etc.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
