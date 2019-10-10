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
			listing => listing.rentalcat === parseInt(props.match.params.rentalTypeId)
		)
		.map(r => (
			<li key={r.id}>
				<Link
					to={{
						pathname: `/rentals/${r.rentalcat}/${r.id}`,
						state: { id: r.id }
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
									pathname: `/rentals/${r.rentalcat}/${r.id}`,
									state: { id: r.id }
								}}>
								Read more
							</Link>
						</span>
					}>
					<p>{r.description}</p>
				</Truncate>
				<span className='postInfo'>
					<p>Posted By: {r.contactname}</p>
					<p>Posted On: {formatDate(r.dateposted)}</p>
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
