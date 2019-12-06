import React from "react";
import { formatPhoneNumberIntl } from "react-phone-number-input";
import formatDate from "../../helpers/formatDate";
//market place listing
export default function ListingBody(props) {
  const l = props.state;
  return (
    <>
      <h3>{l.title}</h3>
      {l.location ? (
        <p>
          <i
            className="fas fa-map-marked-alt"
            samesite="none"
            secure="true"
          ></i>{" "}
          {l.location}
        </p>
      ) : null}
      {l.price ? (
        <p>
          <i className="fas fa-dollar-sign" samesite="none" secure="true"></i>{" "}
          {l.price}
        </p>
      ) : null}
      <h4>Item Description</h4>
      <p>{l.description}</p>
      <div id="mp-contact-info">
        <h4>Contact Information</h4>
        {l.contact_name ? (
          <p>
            <i className="fas fa-user-alt" samesite="none" secure="true"></i>{" "}
            {l.contact_name}
          </p>
        ) : null}

        {l.contact_phone ? (
          <p>
            <i className="fas fa-mobile-alt" samesite="none" secure="true"></i>{" "}
            {formatPhoneNumberIntl(l.contact_phone)}
          </p>
        ) : null}
        {l.contact_email ? (
          <>
            <i className="fas fa-at" samesite="none" secure="true"></i>{" "}
            <a
              href={`mailto: ${l.contact_email}?subject=New Enquiry from you post on Bequia Forum: ${l.title}`}
            >
              {l.contact_email}
            </a>
          </>
        ) : null}
      </div>
      <p>Posted on: {formatDate(l.date_posted)}</p>
    </>
  );
}
