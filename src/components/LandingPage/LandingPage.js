import React, { useContext } from "react";
import ForumContext from "../../ForumContext";
import { Link } from "react-router-dom";
import "./LandingPage.css";

//landing page
export default function LandingPage() {
  window.scroll(0, 0);
  const context = useContext(ForumContext);
  return (
    <section className="landingPage-container">
      <div className="landingPage-content">
        <div id="palm-trees" alt="palm-trees" />
        <div id="landing-page-text">
          <header>
            <h1>Welcome to Bequia Forum!</h1>
            <h4>
              Connect with locals, travelers and the world.
              <br />
              <Link to="/signup">
                <strong>Create a account</strong>
              </Link>{" "}
              today to get the most out of the platform.
            </h4>
          </header>
          <article id="landing-page-message">
            <h5>
              <Link
                to="/messageBoard"
                onClick={() => context.handleNavTextColor("landing_links")}
              >
                <i className="far fa-comments"> Message boards </i>{" "}
              </Link>
              <br />
              <Link
                to="marketPlace"
                onClick={() => context.handleNavTextColor("landing_links")}
              >
                <i className="far fa-lightbulb"> Market Place </i>
              </Link>
              <br />
              <Link
                to="/events"
                onClick={() => context.handleNavTextColor("landing_links")}
              >
                <i className="fas fa-glass-cheers"> Events calendar</i>
              </Link>
              <br />
              <Link
                to="/jobs"
                onClick={() => context.handleNavTextColor("landing_links")}
              >
                <i className="fas fa-globe-europe"> Job Listings </i>
              </Link>{" "}
              <br />
              <Link
                to="/rentals"
                onClick={() => context.handleNavTextColor("landing_links")}
              >
                <i className="fas fa-bed"> Rentals</i>
              </Link>
            </h5>
          </article>
        </div>
      </div>
    </section>
  );
}
