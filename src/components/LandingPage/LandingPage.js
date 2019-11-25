import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <section className="landingPage-container">
      <div className="landingPage-content">
        <div id="palm-trees" alt="palm-trees" />
        <div id="landing-page-text">
          <h1>Welcome to Bequia Forum!</h1>
          <article id="landing-page-text-p">
            <h4>Connect with locals, travelers and the world.</h4>
            <p>
              Message boards, events calendar, job listings, a market place
              and rentals section.
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
