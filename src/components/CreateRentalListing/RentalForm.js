import React from "react";
import PhoneInput from "react-phone-number-input";
import "./RentalForm.css";
import "react-phone-number-input/style.css";

export default function RentalForm(props) {
  var hideAirBnbLable = "show-booking-label";
  var hideHomeAwayLable = "show-booking-label";
  var hideBooking_comLable = "show-booking-label";
  var hideOtherLable = "show-booking-label";
  if (props.state.showAirbnb) {
    hideAirBnbLable += " hide-lable";
  }
  if (props.state.showHomeAway) {
    hideHomeAwayLable += " hide-lable";
  }
  if (props.state.showBooking_com) {
    hideBooking_comLable += " hide-lable";
  }
  if (props.state.showOther) {
    hideOtherLable += " hide-lable";
  }
  const makeRentalTypes = () => {
    return props.state.rentalCats.map(r => (
      <option key={r.id} value={r.id}>
        {r.name}
      </option>
    ));
  };

  return (
    <form className="rental-listing-form" onSubmit={props.handleShowPreview}>
      <select
        name="rental-type"
        id="rental-lisitng-form-rental-type"
        value={props.state.rental_cat}
        onChange={props.handleRentalType}
        required
      >
        {makeRentalTypes()}
      </select>
      <input
        type="text"
        name="title"
        id="rental-lisitng-form-title"
        value={props.state.title}
        placeholder="Listing Title"
        onChange={props.handleTitle}
        required
      />
      <input
        type="text"
        name="location"
        id="rental-listing-form-location"
        value={props.state.location}
        placeholder="Location"
        onChange={props.handleLocation}
        required
      />
      <input
        type="number"
        name="price"
        id="rental-listing-form-price"
        value={props.state.price}
        placeholder="Price"
        onChange={props.handlePrice}
      />
      <textarea
        name="description"
        id="rental-lisitng-form-description"
        value={props.state.description}
        placeholder="Description"
        onChange={props.handleDescription}
        required
      />
      <input
        type="text"
        name="contact-name"
        id="rental-lisitng-form-contact-name"
        value={props.state.contact_name}
        placeholder="Contact Name"
        onChange={props.handleContactName}
        required
      />
      <input
        type="email"
        name="contact-email"
        id="rental-lisitng-form-contact-email"
        value={props.state.contact_email}
        placeholder="Contact Email Address"
        onChange={props.handleContactEmail}
        required
      />
      <PhoneInput
        name="contact-phone"
        id="rental-lisitng-form-contact-phone"
        placeholder="Contact Phone Number"
        country="VC"
        value={props.state.contact_phone}
        onChange={value => props.handleContactPhone(value)}
      />
      <span>
        <input
          className="booking-site-checkbox"
          type="checkbox"
          name="airbnb-site"
          id="rental-lisitng-form-airbnb"
          value={props.state.showAirbnb}
          onChange={props.handleShowAirBnbSiteInput}
        />
        {props.state.showAirbnb ? (
          <input
            className="booking-site-input"
            type="url"
            value={props.state.airbnb}
            name="airbnb-site"
            id="rental-lisitng-form-airbnb-site"
            placeholder="Airbnb Website Address"
            onChange={props.handleAirbnb}
          />
        ) : null}
        <label className={hideAirBnbLable} htmlFor="airbnb">
          AirBnb
        </label>

        <input
          className="booking-site-checkbox"
          type="checkbox"
          name="homeaway"
          id="rental-lisitng-form-homeAway"
          value={props.state.showHomeAway}
          onChange={props.handleShowHomeAwaySiteInput}
        />
        {props.state.showHomeAway ? (
          <input
            className="booking-site-input"
            type="url"
            value={props.state.homeaway}
            name="homeaway-site"
            id="rental-lisitng-form-homeAway-site"
            placeholder="HomeAway Website Address"
            onChange={props.handleHomeAway}
          />
        ) : null}
        <label className={hideHomeAwayLable} htmlFor="homeAway-site">
          HomeAway
        </label>

        <input
          className="booking-site-checkbox"
          type="checkbox"
          name="booking-com"
          id="rental-lisitng-form-booking-com"
          value={props.state.showBooking_com}
          onChange={props.handleShowBookingSiteInput}
        />
        {props.state.showBooking_com ? (
          <input
            className="booking-site-input"
            type="url"
            value={props.state.booking_dot_com}
            name="booking-com-site"
            id="rental-lisitng-form-booking-com-site"
            placeholder="Booking.com Website Address"
            onChange={props.handleBooking_com}
          />
        ) : null}
        <label className={hideBooking_comLable} htmlFor="booking-com-site">
          Booking.com
        </label>
        <input
          className="booking-site-checkbox"
          type="checkbox"
          name="other-site"
          id="rental-lisitng-form-other-site"
          value={props.state.showOther}
          onChange={props.handleShowOtherSiteInput}
        />
        {props.state.showOther ? (
          <input
            className="booking-site-input"
            type="url"
            value={props.state.other_site}
            name="other-site"
            id="rental-lisitng-form-other-site"
            placeholder="Website Address"
            onChange={props.handleOtherSite}
          />
        ) : null}
        <label className={hideOtherLable} htmlFor="booking-com-site">
          Other Site
        </label>
      </span>

      {props.type === "edit" ? (
        <button type="submit">Save Edits</button>
      ) : (
        <button type="submit">Preview Listing</button>
      )}
      <button onClick={props.resetState}>Clear Form</button>
      {props.type === "edit" ? (
        <button onClick={props.showEditPopUp}>Cancel</button>
      ) : (
        <button onClick={() => props.goBack()}>Cancel</button>
      )}
    </form>
  );
}
