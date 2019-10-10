import React from 'react';
import { formatPhoneNumberIntl } from 'react-phone-number-input';
import formatDate from '../../helpers/formatDate';
export default function ListingBody(props) {
	const l = props.state;
	console.log(l);
	return (
		<>
			<h3>{l.title}</h3>
			{l.location ? (
				<>
					<h4>Where</h4>
					<p>{l.location}</p>{' '}
				</>
			) : null}
			{l.price ? <p>Price: {l.price}</p> : null}
			<h4>Item Description</h4>
			<p>{l.description}</p>
			<span>
				<h4>Contact Information</h4>
				<p>{l.contact_name}</p>
				<a
					href={`mailto: ${l.contact_email}?subject=New Enquiry from you post on Bequia Forum: ${l.title}`}>
					{l.contact_email}
				</a>
				<p>Phone: {formatPhoneNumberIntl(l.contact_phone)}</p>
			</span>
			<p>Posted on: {formatDate(l.date_posted)}</p>
		</>
	);
}
