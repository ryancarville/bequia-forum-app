import React from 'react';
import { formatPhoneNumberIntl } from 'react-phone-number-input';
import formatDate from '../../helpers/formatDate';
export default function ListingBody(props) {
	var r = props.post;

	console.log(r);

	const { airbnb, homeaway, booking_dot_com, other_site } = r;
	const bookingSites = [airbnb, homeaway, booking_dot_com, other_site];
	const listingsSites = [];
	for (let i = 0; i < bookingSites.length; i++) {
		if (bookingSites[i] !== null) {
			listingsSites.push({ id: i, site: bookingSites[i] });
		}
	}

	return (
		<>
			<h3>{r.title}</h3>
			<p>{r.location}</p>
			<p>{r.price}</p>
			<p>{r.description}</p>
			<span>
				<h4>Contact</h4>
				<p>{r.contact_name}</p>
				<a href={`mailto:${r.contact_email}`}>{r.contact_email}</a>
				<p>Phone: {formatPhoneNumberIntl(r.contact_phone)}</p>
				<h4>Booking Sites</h4>
				<ul className='rentals-booking-sites'>
					{listingsSites
						? listingsSites.map(b => {
								if (b.site === '') {
									return;
								} else {
									return (
										<li>
											<a
												key={b.id}
												href={b.site}
												target='_blank'
												rel='noopener noreferrer'>
												{b.site}
											</a>
											<br />
										</li>
									);
								}
						  })
						: null}
				</ul>
			</span>
			<p>Posted on: {formatDate(r.date_posted)}</p>
		</>
	);
}
