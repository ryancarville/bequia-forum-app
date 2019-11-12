import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import Truncate from 'react-truncate';
import formatDate from '../../helpers/formatDate';
import './RentalSection.css';
import ForumContext from '../../ForumContext';
import Sort from '../Sort/Sort';

export default function RentalSection(props) {
	const context = useContext(ForumContext);

	const makeRentalListings = context.state.rentalPosts
		.filter(
			listing =>
				listing.rental_cat === parseInt(props.match.params.rentalTypeId)
		)
		.map(r => (
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
				<span className='postInfo'>
					{r.price ? <p>Price: {r.price}</p> : null}
					{r.location ? <p>Location: {r.location}</p> : null}
					<p>Posted By: {r.contact_name}</p>
					<p>Posted On: {formatDate(r.date_posted)}</p>
				</span>
			</li>
		));

	return (
		<section className='rentals-section-container'>
			<Sort sortType='rentals' />
			<div className='rentals-section-content'>
				<ul>
					{makeRentalListings.length !== 0 ? (
						makeRentalListings
					) : (
						<p>There are no current rental listings.</p>
					)}
				</ul>
			</div>
		</section>
	);
}
