import React from "react";
import "./advertise.css";
//advertising page
export default function advertise(props) {
  window.scroll(0, 0);
  return (
    <section className="advertise-container">
      <header>
        <h3>Advertise With Us</h3>
      </header>
      <p>
        Would you like to advertise your business, property or products with us?{" "}
        <br /> <br /> If so, send us an email at <br />{" "}
        <a href="mailto: advertise@bequiaforum.com?subject=New Advertising Enquire">
          advertise@bequiaforum.com
        </a>
      </p>
    </section>
  );
}
