import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import formatDate from '../../helpers/formatDate';
import './MarketPlaceSection.css';
import Truncate from 'react-truncate';
import ForumContext from '../../ForumContext';

export default function MarketPlaceSections(props) {
	const context = useContext(ForumContext);
	const marketPlaceId = props.match.params.marketPlaceId;
	return (
		<section className='market-place-section-container'>
			<div className='market-place-section-content'>
				<ul>
					{context.state.marketPlacePosts.filter(
						p => p.marketPlaceId.toString() === marketPlaceId
					).length !== 0 ? (
						context.state.marketPlacePosts
							.filter(p => p.marketPlaceId.toString() === marketPlaceId)
							.map(l => (
								<li key={l.id}>
									<Link
										to={{
											pathname: `/marketPlace/${marketPlaceId}/${l.id}`,
											state: { listing: l }
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
														state: { listing: l }
													}}>
													Read more
												</Link>
											</span>
										}>
										<p>{l.description}</p>
									</Truncate>
									{l.price ? <p>Price: {l.price}</p> : null}

									<span className='postInfo'>
										<p>Posted By: {l.contact.name}</p>
										<p>Posted On: {formatDate(l.date)}</p>
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
