import React from "react";
import { formatPhoneNumberIntl } from "react-phone-number-input";
import formatDate from "../../helpers/formatDate";
export default function ListingBody(props) {
  var r = props.post;
  const { airbnb, homeaway, booking_dot_com, other_site } = r;
  const sites = [airbnb, homeaway, booking_dot_com, other_site];
  const bookingSites = [];
  for (let i = 0; i < sites.length; i++) {
    if (sites[i] !== null) {
      bookingSites.push({ id: i, site: sites[i] });
    }
  }

  return (
    <>
      <h3>{r.title}</h3>
      <p>{r.location}</p>
      <p>{r.price}</p>
      <p>{r.description}</p>
      <span>
        <h4>Contact</h4>
        <p>{r.contact_name}</p>
        <a href={`mailto:${r.contact_email}`}>{r.contact_email}</a>
        <p>Phone: {formatPhoneNumberIntl(r.contact_phone)}</p>
        <h4>Booking Sites</h4>
        <ul className="rentals-booking-sites">
          {bookingSites
            ? bookingSites.map(b => {
                if (b.site === "") {
                  return null;
                } else {
                  return (
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
                  );
                }
              })
            : null}
        </ul>
      </span>
      <p>Posted on: {formatDate(r.date_posted)}</p>
    </>
  );
}
