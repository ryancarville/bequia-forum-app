import React from 'react';
import { Link } from 'react-router-dom';
import './CreateContentButton.css';
export default function AddPost(props) {
	if (props.forumType === 'jobs') {
		return (
      <span className="create-post-button">
        <Link to={"/createJobListing"} id="create-job-listing-button">
          <i className="fas fa-plus" samesite="none" secure="true"></i>Listing
        </Link>
      </span>
    );
	} else if (props.forumType === 'rentals') {
		return (
      <span className="create-post-button">
        <Link to={"/createRentalListing"} id="create-rental-listing-button">
          <i className="fas fa-plus" samesite="none" secure="true"></i>Listing
        </Link>
      </span>
    );
	} else if (props.forumType === 'market-place') {
		return (
      <span className="create-post-button">
        <Link
          to={"/createMarketPlaceListing"}
          id="create-market-place-listing-button"
        >
          <i className="fas fa-plus" samesite="none" secure="true"></i>
          Listing
        </Link>
      </span>
    );
	} else if (props.forumType === 'events') {
		return (
      <span className="create-post-button">
        <Link to={"/createEvent"} id="create-event-listing-button">
          <i className="fas fa-plus" samesite="none" secure="true"></i>Event
        </Link>
      </span>
    );
	} else if (props.forumType === 'desktop') {
		return (
      <li>
        <span className="create-post-button">
          <Link
            to={{ pathname: `/createPost`, state: { forumId: props.forumId } }}
            id="create-forum-post-button"
          >
            <i className="fas fa-plus" samesite="none" secure="true"></i>Thread
          </Link>
        </span>
      </li>
    );
	} else if (props.forumType === 'mobile') {
		return (
      <li>
        <Link
          to={{ pathname: `/createPost`, state: { forumId: props.forumId } }}
          id="create-forum-post-button"
          className="mobile-nav-link"
        >
          <i className="far fa-plus-square" samesite="none" secure="true"></i>
        </Link>
      </li>
    );
	}
}
