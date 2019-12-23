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
            <h4>
              Connect with locals, travelers and the world.
              <Link to="/signup">
                <strong>Create an account</strong>
              </Link>{" "}
              today to get the most out of the platform.
            </h4>
          </header>
          <article id="landing-page-message">
            <h5>
              <Link to="/messageBoard">
                <i className="far fa-comments"> Message boards </i>{" "}
              </Link>
              <br />
              <Link to="/events">
                <i className="fas fa-glass-cheers"> Events calendar</i>
              </Link>
              <br />
              <Link to="/jobs">
                <i className="fas fa-globe-europe"> Job Listings </i>
              </Link>{" "}
              <br />
              <Link to="marketPlace">
                <i className="far fa-lightbulb"> Market Place </i>
              </Link>
              <br />
              <Link to="/rentals">
                <i className="fas fa-bed"> Rentals</i>
              </Link>
            </h5>
          </article>
        </div>
      </div>
    </section>
  );
}
