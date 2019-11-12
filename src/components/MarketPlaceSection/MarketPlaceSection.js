import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import formatDate from '../../helpers/formatDate';
import './MarketPlaceSection.css';
import Truncate from 'react-truncate';
import ForumContext from '../../ForumContext';
import Sort from '../Sort/Sort';

export default function MarketPlaceSections(props) {
	const context = useContext(ForumContext);
	const listings = context.state.marketPlacePosts;
	const marketPlaceId = props.match.params.marketPlaceId;
	return (
		<section className='market-place-section-container'>
			<Sort sortType='marketPlace' />
			<div className='market-place-section-content'>
				<ul>
					{listings.filter(p => p.market_place_cat.toString() === marketPlaceId)
						.length !== 0 ? (
						listings
							.filter(p => p.market_place_cat.toString() === marketPlaceId)
							.map(l => (
								<li key={l.id}>
									<Link
										to={{
											pathname: `/marketPlace/${marketPlaceId}/${l.id}`,
											state: { id: l.id }
										}}>
										<h4>{l.title}</h4>
									</Link>
									<Truncate
										lines={1}
										ellipsis={
											<span>
												...
												<Link
													to={{
														pathname: `/marketPlace/${marketPlaceId}/${l.id}`,
														state: { id: l.id }
													}}>
													Read more
												</Link>
											</span>
										}>
										<p>{l.description}</p>
									</Truncate>
									<span className='post-info'>
										{l.price ? <p>Price: {l.price}</p> : null}
										{l.location ? <p>Location: {l.location}</p> : null}
										<p>Posted By: {l.contact_name}</p>
										<p>Posted On: {formatDate(l.date_posted)}</p>
									</span>
								</li>
							))
					) : (
						<p>There are currently no market place listings here.</p>
					)}
				</ul>
			</div>
		</section>
	);
}
