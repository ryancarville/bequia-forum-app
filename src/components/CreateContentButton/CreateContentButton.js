import React from "react";
import { Link } from "react-router-dom";
import "./CreateContentButton.css";
//create any content buttons for entire site
export default function AddPost(props) {
  //create job listing button
  if (props.forumType === "jobs") {
    return (
      <span className="create-post-button">
        <Link to={"/createJobListing"} id="create-job-listing-button">
          <i className="fas fa-plus"></i>Listing
        </Link>
      </span>
    );
  }
  //create rentals listing button
  else if (props.forumType === "rentals") {
    return (
      <span className="create-post-button">
        <Link to={"/createRentalListing"} id="create-rental-listing-button">
          <i className="fas fa-plus"></i>Listing
        </Link>
      </span>
    );
  }
  //create market place button
  else if (props.forumType === "market-place") {
    return (
      <span className="create-post-button">
        <Link
          to={"/createMarketPlaceListing"}
          id="create-market-place-listing-button"
        >
          <i className="fas fa-plus"></i>
          Listing
        </Link>
      </span>
    );
  }
  //create event button
  else if (props.forumType === "events") {
    return (
      <span className="create-post-button">
        <Link to={"/createEvent"} id="create-event-listing-button">
          <i className="fas fa-plus"></i>Event
        </Link>
      </span>
    );
  }
  //create post for desktop site button
  else if (props.forumType === "desktop") {
    return (
      <li>
        <span className="create-post-button">
          <Link
            to={{ pathname: `/createPost`, state: { forumId: props.forumId } }}
            id="create-forum-post-button"
          >
            <i className="fas fa-plus"></i>Thread
          </Link>
        </span>
      </li>
    );
  }
  //create post for mobile site button
  else if (props.forumType === "mobile") {
    return (
      <li>
        <Link
          to={{ pathname: `/createPost`, state: { forumId: props.forumId } }}
          id="create-forum-post-button"
          className="mobile-nav-link"
        >
          <i className="far fa-plus-square"></i>
        </Link>
      </li>
    );
  }
}
