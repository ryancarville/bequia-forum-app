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
						<li key={mp.id} className='market-place-card'>
							<Link key={`link-${mp.id}`} to={`/marketPlace/${mp.id}`}>
								<img
									src={mp.img_path}
									alt={mp.name}
									className='market-place-img'
								/>
								<span className='market-place-card-text'>
									<h4>{mp.name}</h4>
									<p>{mp.description}</p>
								</span>
							</Link>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
