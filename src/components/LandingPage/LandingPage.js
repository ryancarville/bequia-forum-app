import React, { useContext } from "react";
import ForumContext from "../../ForumContext";
import { Link } from "react-router-dom";
import "./LandingPage.css";

//landing page
export default function LandingPage(props) {
  window.scroll(0, 0);
  const context = useContext(ForumContext);
  return (
    <section className="landingPage-container">
      <div className="landingPage-content">
        <div id="landing-page-text">
          <header>
            <h1>Welcome to Bequia Forum!</h1>
            <h4>Connect with locals, travelers and the world.</h4>
            <h3>
              <Link onClick={() => context.handleNavTextColor()} to="/signup">
                Join today
              </Link>{" "}
              to get the most out of the platform.
            </h3>
          </header>
        </div>
      </div>
    </section>
  );
}
