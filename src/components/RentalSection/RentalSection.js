import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Truncate from 'react-truncate';
import formatDate from '../../helpers/formatDate';
import './RentalSection.css';
import ForumContext from '../../ForumContext';
import Sort from '../Sort/Sort';
import apiServices from '../../services/apiServices';

export default class RentalSection extends Component {
	constructor(props) {
		super(props);
		this.state = {
			listings: []
		};
	}
	componentDidMount() {
		apiServices
			.getRentalListings(this.props.match.params.rental_cat)
			.then(listings => {
				if (listings.error) {
					this.setState({ error: listings.error });
				} else {
					this.setState({ listings: listings });
				}
			});
	}

	makeRentalListings = () =>
		this.state.listings.map(r => (
			<li key={r.id}>
				<Link to={`/rentals/${r.rental_cat}/${r.id}`}>
					<h3>{r.title}</h3>
				</Link>
				<Truncate
					lines={2}
					ellipsis={
						<span>
							...
							<Link to={`/rentals/${r.rental_cat}/${r.id}`}>Read more</Link>
						</span>
					}>
					<p>{r.description}</p>
				</Truncate>
				<span className='post-info'>
					{r.price ? <p>Price: {r.price}</p> : null}
					{r.location ? <p>Location: {r.location}</p> : null}
					<p>Posted By: {r.contact_name}</p>
					<p>Posted On: {formatDate(r.date_posted)}</p>
				</span>
			</li>
		));

	render() {
		return (
			<section className='rentals-section-container'>
				<Sort sortType='rentals' />
				<div className='rentals-section-content'>
					{this.state.listings.length !== 0 ? (
						<ul>{this.makeRentalListings()}</ul>
					) : (
						<p id='rentals-section-error'>{this.state.error}</p>
					)}
				</div>
			</section>
		);
	}
}
