import React, { Component } from 'react';
import ForumContext from '../../ForumContext';
import './MarketPlace.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export default class MarketPlace extends Component {
	marketListings = listings =>
		!listings ? (
			<p>There are currently no listings</p>
		) : (
			listings.map(l => (
				<div className='market-place-listing' key={l.saleId}>
					<h4>
						<Link
							to={{
								pathname: `/marketplace/${l.saleId}`,
								state: {
									item: l
								}
							}}>
							{l.title}
						</Link>
					</h4>
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
