import React from 'react';
import { formatPhoneNumberIntl } from 'react-phone-number-input';
import './MarketPlacePage.css';

export default function MarketPlacePage(props) {
	const l = props.location.state.listing;
	return (
		<section className='market-place-page-container'>
			<div className='market-place-page-content'>
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
					<p>{l.contact.name}</p>
					<a
						href={`mailto: ${l.contact.email}?subject=New Enquiry from you post on Bequia Forum: ${l.title}`}>
						{l.contact.email}
					</a>
					<p>Phone: {formatPhoneNumberIntl(l.contact.phone)}</p>
				</span>
			</div>
		</section>
	);
}
