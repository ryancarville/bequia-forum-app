import React from 'react';
import { Link } from 'react-router-dom';
import './CreateContentButton.css';
export default function AddPost(props) {
	if (props.forumType === 'jobs') {
		return (
			<span className='create-post-button'>
				<Link to={'/createJobListing'} id='create-job-listing-button'>
					<i className='fas fa-plus'></i>Listing
				</Link>
			</span>
		);
	} else if (props.forumType === 'rentals') {
		return (
			<span className='create-post-button'>
				<Link to={'/createRentalListing'} id='create-rental-listing-button'>
					<i className='fas fa-plus'></i>Listing
				</Link>
			</span>
		);
	} else if (props.forumType === 'market-place') {
		return (
			<span className='create-post-button'>
				<Link
					to={'/createMarketPlaceListing'}
					id='create-market-place-listing-button'>
					<i className='fas fa-plus'></i>
					Listing
				</Link>
			</span>
		);
	} else if (props.forumType === 'events') {
		return (
			<span className='create-post-button'>
				<Link to={'/createEvent'} id='create-event-listing-button'>
					<i className='fas fa-plus'></i>Event
				</Link>
			</span>
		);
	} else {
		return (
			<span className='create-post-button'>
				<Link
					to={{ pathname: `/createPost`, state: { forumId: props.forumId } }}
					id='create-forum-post-button'>
					<i className='fas fa-plus'></i>
					Thread
				</Link>
			</span>
		);
	}
}
