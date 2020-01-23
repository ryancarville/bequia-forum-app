import React from "react";
import "./ListingPreview.css";
import formatDate from "../../helpers/formatDate";
import ImageGallery from "../ImageGallery/ImageGallery";
import { formatPhoneNumberIntl } from "react-phone-number-input";

export default function ListingPreview(props) {
  const { newListing } = props.state;
  const forumSection = props.state.forumSections.filter(
    mp => mp.id === parseInt(newListing.forumSection)
  );
  console.log(newListing);
  return (
    <section className="listing-preview">
      <h2>
        Posting in category: <br />
        {forumSection[0].name}
      </h2>
      <aside className="preview-wrapper">
        <aside>
          <h3>{newListing.title}</h3>
          {newListing.location ? (
            <>
              {" "}
              <h4>Location</h4> <p>{newListing.location}</p>
            </>
          ) : null}
          <p>
            <h4>Price</h4> <p>${newListing.price}</p>
          </p>
          {newListing.description ? (
            <>
              <h4>Description</h4>
              <p>{newListing.description}</p>
            </>
          ) : null}
        </aside>
        {newListing.imagesToUpload.length > 0 ? (
          <aside id="preview-image-gallery">
            <ImageGallery
              images={newListing.imagesToUpload}
              captions={newListing.imageCaptions}
            />
          </aside>
        ) : null}
        <aside>
          <h4>Contact Information</h4>
          <p>{newListing.contact_name}</p>
          <i className="fas fa-at"></i>{" "}
          <a
            href={`mailto:${newListing.contact_email}?subject=New Enquiry on ${newListing.title}`}
            value={newListing.contact_email}
          >
            {newListing.contact_email}
          </a>
          {newListing.contact_phone ? (
            <p>
              <i className="fas fa-mobile-alt"></i>{" "}
              {formatPhoneNumberIntl(newListing.contact_phone)}
            </p>
          ) : null}
        </aside>
        <br />
        <p>Posted on: {formatDate(newListing.date_posted)}</p>
      </aside>

      <span className="listing-form-buttons-wrapper">
        <button onClick={props.handleSubmit}>Create Listing</button>
        <button onClick={() => props.handleShowPreview(newListing)}>
          Edit
        </button>
        <button onClick={() => props.goBack()}>Cancel</button>
      </span>
    </section>
  );
}
