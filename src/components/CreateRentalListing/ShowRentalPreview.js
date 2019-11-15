import React from "react";
import { formatPhoneNumberIntl } from "react-phone-number-input";
import "./ShowRentalPreview.css";

export default function ShowRentalpreview(props) {
  const rentalcat = props.state.rentalCats.filter(
    c => c.id === parseInt(props.state.rental_cat)
  );
  return (
    <section>
      <div>
        <h2>Posting in catagory: {rentalcat[0].name}</h2>
        <h3>Title: {props.state.title}</h3>
        <p>Location: {props.state.location}</p>
        <p>Price: {props.state.price}</p>
        <h4>Description</h4>
        <p>{props.state.description}</p>
        <h4>Contact Information</h4>
        <span>
          <p>Contact Name: {props.state.contact_name}</p>
          <p>
            Email Address:{" "}
            <a
              href={`mailto:${props.state.contact_email}?subject=New Enquiry on ${props.state.title}`}
            >
              {props.state.contact_email}
            </a>
          </p>
          <p>Phone: {formatPhoneNumberIntl(props.state.contact_phone)}</p>
        </span>
        <section>
          {props.state.showAirbnb ||
          props.state.showHomeAway ||
          props.state.showBooking_com ||
          props.state.showOther ? (
            <h4>Booking Sites</h4>
          ) : null}
          {props.state.showAirbnb ? (
            <a
              href={props.state.airbnb}
              target="_blank"
              rel="noopener noreferrer"
            >
              AirBnb
            </a>
          ) : null}
          {props.state.showHomeAway ? (
            <a
              href={props.state.homeaway}
              target="_blank"
              rel="noopener noreferrer"
            >
              HomeAway
            </a>
          ) : null}
          {props.state.showBooking_com ? (
            <a
              href={props.state.booking_dot_com}
              target="_blank"
              rel="noopener noreferrer"
            >
              Booking.com
            </a>
          ) : null}
          {props.state.showOther ? (
            <a
              href={props.state.other_site}
              target="_blank"
              rel="noopener noreferrer"
            >
              {props.state.othersite}
            </a>
          ) : null}
        </section>
        <button onClick={props.handleSubmit}>Create Listing</button>
        <button onClick={props.handleShowPreview}>Edit</button>
        <button onClick={() => props.goBack()}>Cancel</button>
      </div>
    </section>
  );
}
