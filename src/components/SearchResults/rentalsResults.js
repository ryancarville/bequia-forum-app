import React from 'react';
import { Link } from 'react-router-dom';
import Truncate from 'react-truncate';
import formatDate from '../../helpers/formatDate';
export default function RentalsSearchResults(props) {
	const rentalsPosts = () => {
		return props.posts.map(r => (
			<li key={r.id}>
				<Link
					to={{
						pathname: `/rentals/${r.rental_cat}/${r.id}`,
						state: { id: r.id }
					}}>
					<h3>{r.title}</h3>
				</Link>
				<br />
				<Truncate
					lines={1}
					ellipsis={
						<span>
							...
							<Link
								to={{
									pathname: `/rentals/${r.rental_cat}/${r.id}`,
									state: { id: r.id }
								}}>
								Read more
							</Link>
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
	};
	return rentalsPosts();
}
