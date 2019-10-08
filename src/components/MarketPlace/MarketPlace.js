import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './MarketPlace.css';
import CreateContentButton from '../CreateContentButton/CreateContentButton';
import TokenService from '../../services/TokenServices';
import ForumContext from '../../ForumContext';

export default function MarketPlace(props) {
	const context = useContext(ForumContext);
	console.log(context.state.marketPlaceCatagories);
	return (
		<section className='market-place-container'>
			<span>
				<h3>Market Place</h3>
				{TokenService.getAuthToken() ? (
					<CreateContentButton forumType='market-place' />
				) : null}
			</span>
			<div className='market-place-content'>
				<ul>
					{context.state.marketPlaceCatagories.map(mp => (
						<Link key={`link-${mp.id}`} to={`/marketPlace/${mp.id}`}>
							<li key={mp.id}>
								<h4>{mp.name}</h4>
								<p>{mp.description}</p>
							</li>
						</Link>
					))}
				</ul>
			</div>
		</section>
	);
}
