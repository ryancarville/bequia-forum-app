import React from 'react';
import './MarketListingPage.css';

export default function MarketListingPage(props) {
	const listing = (
		<div className='market-listing-item' key={props.location.state.item.saleId}>
			<h4>{props.location.state.item.title}</h4>
			<p>{props.location.state.item.price}</p>
			<p>{props.location.state.item.description}</p>
			<span>
				Contact: {props.location.state.item.contact.name}
				<br />
				Email:{' '}
				<a href={`mailto:${props.location.state.item.contact.email}`}>
					{props.location.state.item.contact.email}
				</a>
				<br />
				Phone: {props.location.state.item.contact.phone}
			</span>
		</div>
	);
	return (
		<section className='market-listing-container'>
			<div className='market-listing-content'>{listing}</div>
		</section>
	);
}
