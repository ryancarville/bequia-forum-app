import React from 'react';
import { formatPhoneNumberIntl } from 'react-phone-number-input';
import './ShowRentalPreview.css';

export default function ShowRentalpreview(props) {
	return (
		<section>
			<div>
				<h3>{props.state.title}</h3>
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
				<section>
					{props.state.airbnb ||
					props.state.homeAway ||
					props.state.booking_com ||
					props.state.other ? (
						<h4>Booking Sites</h4>
					) : null}
					{props.state.airbnb ? (
						<a
							href={props.state.airbnbSite}
							target='_blank'
							rel='noopener noreferrer'>
							AirBnb
						</a>
					) : null}
					{props.state.homeAway ? (
						<a
							href={props.state.homeAwaySite}
							target='_blank'
							rel='noopener noreferrer'>
							HomeAway
						</a>
					) : null}
					{props.state.booking_com ? (
						<a
							href={props.state.booking_comSite}
							target='_blank'
							rel='noopener noreferrer'>
							Booking.com
						</a>
					) : null}
					{props.state.other ? (
						<a
							href={props.state.otherSite}
							target='_blank'
							rel='noopener noreferrer'>
							{props.state.otherSite}
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
