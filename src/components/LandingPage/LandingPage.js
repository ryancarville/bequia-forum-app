import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";
//landing page
export default function LandingPage() {
  window.scroll(0, 0);
  return (
    <section className="landingPage-container">
      <div className="landingPage-content">
        <div id="palm-trees" alt="palm-trees" />
        <div id="landing-page-text">
          <header>
            <h1>Welcome to Bequia Forum!</h1>
            <h4>Connect with locals, travelers and the world.</h4>
          </header>
          <article id="landing-page-message">
            <p>
              Message boards, events calendar, job listings, a market place and
              rentals section.
              <br /> <Link to="/signup">Create an account</Link> today to get
              the most out of the platform.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
