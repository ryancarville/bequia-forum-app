import React, { Component } from 'react';
import './RentalPage.css';
import ForumContext from '../../ForumContext';

export default class RentalPage extends Component {
	rentalListing = rentals => {
		const rental = rentals.filter(
			r => r.rentalId.toString() === this.props.match.params.rentalId
		);
		const listing = (
			<div className='rental-listing'>
				<h3>{rental[0].title}</h3>
				<h4>Posted By: {rental[0].contact.name}</h4>
				<p>Description: {rental[0].description}</p>
				<p>Date Posted: {rental[0].datePosted}</p>
				<h5>
					Contact Information: <br /> Email:{' '}
					<a href={`mailto:${rental[0].contact.email}`}>
						{rental[0].contact.email}
					</a>
					<br />
					Phone: {rental[0].contact.phone}
				</h5>
			</div>
		);
		return listing;
	};
	render() {
		return (
			<section className='rental-page-container'>
				<div className='rental-page-content'>
					<ForumContext.Consumer>
						{context => this.rentalListing(context.rentals)}
					</ForumContext.Consumer>
				</div>
			</section>
		);
	}
}
