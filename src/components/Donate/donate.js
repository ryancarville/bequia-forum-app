import React from "react";
import "./donate.css";
//donate page
export default function donate(props) {
  window.scroll(0, 0);
  return (
    <section className="donate-container">
      <div>
        <h2>Donate</h2>
        <p>
          Help us keep the platform going! All proceeds will go directly towards
          server fees and the ability to continue to exand the platform to make
          your experience better.
        </p>
        <form
          action="https://www.paypal.com/cgi-bin/webscr"
          method="post"
          target="_top"
        >
          <input type="hidden" name="cmd" value="_s-xclick" />
          <input type="hidden" name="hosted_button_id" value="3CA64JCSVQ5UE" />
          <input
            type="image"
            src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif"
            border="0"
            name="submit"
            title="PayPal - The safer, easier way to pay online!"
            alt="Donate with PayPal button"
          />
          <img
            alt=""
            border="0"
            src="https://www.paypal.com/en_US/i/scr/pixel.gif"
            width="1"
            height="1"
          />
        </form>
      </div>
    </section>
  );
}
