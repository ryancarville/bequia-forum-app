import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ForumContext from '../../ForumContext';
import Sort from '../Sort/Sort';
import './Rentals.css';

export default class Rentals extends Component {
	formatDate = imageDate => {
		const date = new Date(imageDate);
		const formatted_date = new Intl.DateTimeFormat('en-US').format(date);
		return formatted_date;
	};
	rentalListings = rentals => {
		const rentalListing = rentals ? (
			rentals.map(r => (
				<div className='rental-listing' key={r.rentalId}>
					<h3>
						<Link to={`/rentals/${r.rentalId}`}>{r.title}</Link>
					</h3>
					<p>Description: {r.description}</p>
					<p>Date Posted: {this.formatDate(r.datePosted)}</p>
				</div>
			))
		) : (
			<p>There are no rental rental lisitngs currently.</p>
		);
		return rentalListing;
	};
	render() {
		return (
			<ForumContext.Consumer>
				{context => (
					<section className='rentals-container'>
						<Sort sortType={'rentals'} handleSort={context.sort} />
						<div className='rentals-content'>
							{this.rentalListings(context.rentals)}
						</div>
					</section>
				)}
			</ForumContext.Consumer>
		);
	}
}
