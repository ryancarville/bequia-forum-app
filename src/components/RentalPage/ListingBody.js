import React from "react";
import { formatPhoneNumberIntl } from "react-phone-number-input";
import formatDate from "../../helpers/formatDate";
import waveLoader from "../Icons/waveLoader";
//rental listing
export default function ListingBody(props) {
  var r = props.post;
  const { airbnb, homeaway, booking_dot_com, other_site } = r;
  const sites = [airbnb, homeaway, booking_dot_com, other_site];
  const bookingSites = [];
  for (let i = 0; i < sites.length; i++) {
    if (sites[i] !== "") {
      bookingSites.push({ id: i, site: sites[i] });
    }
  }
  const makeListing = (
    <>
      <h3>{r.title}</h3>
      {r.location ? (
        <p>
          <i
            className="fas fa-map-marked-alt"
            samesite="none"
            secure="true"
          ></i>{" "}
          {r.location}{" "}
        </p>
      ) : null}
      {r.price || r.price === "0" ? (
        <p>
          {" "}
          <i
            className="fas fa-dollar-sign"
            samesite="none"
            secure="true"
          ></i>{" "}
          {r.price}{" "}
        </p>
      ) : null}
      <p>{r.description}</p>
      <span>
        <h4>Contact</h4>
        <p>{r.contact_name ? r.contact_name : null}</p>
        {r.contact_email ? (
          <a href={`mailto:${r.contact_email}`}>{r.contact_email}</a>
        ) : null}
        {r.contact_phone ? (
          <p>Phone: {formatPhoneNumberIntl(r.contact_phone)}</p>
        ) : null}
        {bookingSites.length > 0 ? (
          <>
            <h4>Booking Sites</h4>
            <ul className="rentals-booking-sites">
              {bookingSites.map(b => (
                <li key={b.id}>
                  <a
                    key={b.id}
                    href={b.site}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {b.site}
                  </a>
                  <br />
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </span>
      <p>Posted on: {formatDate(r.date_posted)}</p>
    </>
  );

  return r ? makeListing : waveLoader;
}
