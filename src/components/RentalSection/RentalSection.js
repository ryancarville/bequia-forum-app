import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import Truncate from 'react-truncate';
import formatDate from '../../helpers/formatDate';
import './RentalSection.css';
import ForumContext from '../../ForumContext';

export default function RentalSection(props) {
	const context = useContext(ForumContext);
	const makeRentalListings = context.state.rentalPosts
		.filter(
			listing =>
				listing.rentalTypeId.toString() === props.match.params.rentalTypeId
		)
		.map(r => (
			<li key={r.id}>
				<Link
					to={{
						pathname: `/rentals/${props.match.params.rentalTypeId}/${r.id}`,
						state: { rental: r }
					}}>
					<h3>{r.title}</h3>
				</Link>
				<Truncate
					lines={1}
					ellipsis={
						<span>
							...
							<Link
								to={{
									pathname: `/rentals/${props.match.params.rentalTypeId}/${r.id}`,
									state: { rental: r }
								}}>
								Read more
							</Link>
						</span>
					}>
					<p>{r.description}</p>
				</Truncate>
				<span className='postInfo'>
					<p>Posted By: {r.contact.name}</p>
					<p>Posted On: {formatDate(r.date)}</p>
				</span>
			</li>
		));

	return (
		<section className='rentals-section-container'>
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
