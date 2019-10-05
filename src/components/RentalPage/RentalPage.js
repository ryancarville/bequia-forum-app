import React from 'react';
import { formatPhoneNumberIntl } from 'react-phone-number-input';
import './RentalPage.css';

export default function RentalPage(props) {
	const bookingSites = (
		<>
			<h4>Booking Sites</h4>
			{props.location.state.rental.bookingSites.map(booking =>
				booking.site !== '' ? (
					<>
						<a href={booking.site} target='_blank' rel='noopener noreferrer'>
							{booking.title}
						</a>
						<br />
					</>
				) : null
			)}
		</>
	);

	return (
		<section className='rental-page-container'>
			<div className='rental-page-content'>
				<h3>{props.location.state.rental.title}</h3>
				<p>{props.location.state.rental.description}</p>
				<span>
					<h4>Contact</h4>
					<p>{props.location.state.rental.contact.name}</p>
					<a href={`mailto:${props.location.state.rental.contact.email}`}>
						{props.location.state.rental.contact.email}
					</a>
					<p>
						Phone:{' '}
						{formatPhoneNumberIntl(props.location.state.rental.contact.phone)}
					</p>

					{bookingSites}
				</span>
			</div>
		</section>
	);
}
