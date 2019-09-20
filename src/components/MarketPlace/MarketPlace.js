import React, { Component } from 'react';
import ForumContext from '../../ForumContext';
import './MarketPlace.css';

export default class MarketPlace extends Component {
	marketListings = listings =>
		!listings ? (
			<p>There are currently no listings</p>
		) : (
			listings.map(l => (
				<div className='market-place-listing'>
					<h4>{l.title}</h4>
					<p>{l.price}</p>
					<p>{l.description}</p>
					<span>
						Contact: {l.contact.name}
						<br />
						Email: <a href={`mailto:${l.contact.email}`}>{l.contact.email}</a>
						<br />
						Phone: {l.contact.phone}
					</span>
				</div>
			))
		);
	render() {
		return (
			<section className='market-place-container'>
				<div className='market-place-content'>
					<ForumContext.Consumer>
						{context => this.marketListings(context.marketPlace)}
					</ForumContext.Consumer>
				</div>
			</section>
		);
	}
}
