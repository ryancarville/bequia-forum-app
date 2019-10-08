import React from 'react';
import { formatPhoneNumberIntl } from 'react-phone-number-input';
import './RentalPage.css';

export default function RentalPage(props) {
	console.log(props.location.state.rental);
	const {
		airbnb,
		homeaway,
		bookingdotcom,
		othersite
	} = props.location.state.rental;
	const bookingSites = [airbnb, homeaway, bookingdotcom, othersite];

	return (
		<section className='rental-page-container'>
			<div className='rental-page-content'>
				<h3>{props.location.state.rental.title}</h3>
				<p>{props.location.state.rental.description}</p>
				<span>
					<h4>Contact</h4>
					<p>{props.location.state.rental.contactname}</p>
					<a href={`mailto:${props.location.state.rental.contactemail}`}>
						{props.location.state.rental.contactemail}
					</a>
					<p>
						Phone:{' '}
						{formatPhoneNumberIntl(props.location.state.rental.contactphone)}
					</p>
					<h4>Booking Sites</h4>
					{bookingSites
						? bookingSites.map(b => (
								<>
									<a href={b} target='_blank' rel='noopener noreferrer'>
										{b}
									</a>
									<br />
								</>
						  ))
						: null}
				</span>
			</div>
		</section>
	);
}
