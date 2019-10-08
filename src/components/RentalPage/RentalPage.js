import React from 'react';
import { formatPhoneNumberIntl } from 'react-phone-number-input';
import formatDate from '../../helpers/formatDate';
import './RentalPage.css';

export default function RentalPage(props) {
	console.log(props.location.state.rental);
	const r = props.location.state.rental;
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
				<h3>{r.title}</h3>
				<p>{r.description}</p>
				<span>
					<h4>Contact</h4>
					<p>{r.contactname}</p>
					<a href={`mailto:${r.contactemail}`}>{r.contactemail}</a>
					<p>Phone: {formatPhoneNumberIntl(r.contactphone)}</p>
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
				<p>Posted on: {formatDate(r.dateposted)}</p>
			</div>
		</section>
	);
}
