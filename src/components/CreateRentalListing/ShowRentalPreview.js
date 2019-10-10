import React, { useContext } from 'react';
import { formatPhoneNumberIntl } from 'react-phone-number-input';
import './ShowRentalPreview.css';
import ForumContext from '../../ForumContext';

export default function ShowRentalpreview(props) {
	const context = useContext(ForumContext);
	const rentalcat = context.state.rentalCatagories.filter(
		c => c.id === parseInt(props.state.rentalcat)
	);
	return (
		<section>
			<div>
				<h2>Posting in catagory: {rentalcat[0].name}</h2>
				<h3>{props.state.title}</h3>
				<p>{props.state.location}</p>
				<p>{props.state.price}</p>
				<h4>Description</h4>
				<p>{props.state.description}</p>
				<h4>Contact Information</h4>

				<span>
					<p>{props.state.contactname}</p>
					<a
						href={`mailto:${props.state.contactemail}?subject=New Enquiry on ${props.state.title}`}>
						{props.state.contactemail}
					</a>
					<p>Phone: {formatPhoneNumberIntl(props.state.contactphone)}</p>
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
							target='_blank'
							rel='noopener noreferrer'>
							AirBnb
						</a>
					) : null}
					{props.state.showHomeAway ? (
						<a
							href={props.state.homeaway}
							target='_blank'
							rel='noopener noreferrer'>
							HomeAway
						</a>
					) : null}
					{props.state.showBooking_com ? (
						<a
							href={props.state.bookingdotcom}
							target='_blank'
							rel='noopener noreferrer'>
							Booking.com
						</a>
					) : null}
					{props.state.showOther ? (
						<a
							href={props.state.othersite}
							target='_blank'
							rel='noopener noreferrer'>
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
