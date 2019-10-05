import React from 'react';
import { formatPhoneNumberIntl } from 'react-phone-number-input';
import './ShowMarketPlaceListingPreview.css';

export default function ShowMarketPlaceListingPreview(props) {
	return (
		<div className='mp-listing-preview'>
			<h3>{props.state.title}</h3>
			<p>Price: ${props.state.price}</p>
			{props.state.location ? (
				<>
					{' '}
					<h4>Location</h4> <p>{props.state.location}</p>
				</>
			) : null}
			<h4>Description</h4>
			<p>{props.state.description}</p>
			<h4>Contact Information</h4>

			<span>
				<p>{props.state.contact.name}</p>
				<a
					href={`mailto:${props.state.contact.email}?subject=New Enquiry on ${props.state.title}`}>
					{props.state.contact.email}
				</a>
				<p>Phone: {formatPhoneNumberIntl(props.state.contact.phone)}</p>
			</span>
			<button onClick={() => props.handleSubmit()}>Create Listing</button>
			<button onClick={props.handleShowPreview}>Edit</button>
			<button onClick={() => props.goBack()}>Cancel</button>
		</div>
	);
}
