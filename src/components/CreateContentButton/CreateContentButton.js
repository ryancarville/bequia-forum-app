import React from 'react';
import { Link } from 'react-router-dom';
import './CreateContentButton.css';
export default function AddPost(props) {
	if (props.forumType === 'jobs') {
		return (
			<span className='create-post-button' id='create-job-listing-button'>
				<Link to={'/createJobListing'}>Create Job Listing</Link>
			</span>
		);
	} else if (props.forumType === 'rentals') {
		return (
			<span className='create-post-button' id='create-rental-listing-button'>
				<Link to={'/createRentalListing'}>Create Rental Listing</Link>
			</span>
		);
	} else if (props.forumType === 'market-place') {
		return (
			<span
				className='create-post-button'
				id='create-market-place-listing-button'>
				<Link to={'/createMarketPlaceListing'}>
					Create Market Place Listing
				</Link>
			</span>
		);
	} else if (props.forumType === 'events') {
		return (
			<span className='create-post-button' id='create-event-listing-button'>
				<Link to={'/createEvent'}>Create Event</Link>
			</span>
		);
	} else {
		return (
			<span className='create-post-button' id='create-forum-post-button'>
				<Link
					to={{ pathname: `/createPost`, state: { forumId: props.forumId } }}>
					Create Post
				</Link>
			</span>
		);
	}
}
