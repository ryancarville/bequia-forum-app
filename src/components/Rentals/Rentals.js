import React, { useContext } from 'react';

import './Rentals.css';
import { Link } from 'react-router-dom';
import TokenService from '../../services/TokenServices';
import CreateContentButton from '../CreateContentButton/CreateContentButton';
import ForumContext from '../../ForumContext';

export default function Rentals(props) {
	const context = useContext(ForumContext);

	return (
		<section className='rentals-container'>
			<span>
				<h2>Rentals</h2>
				{TokenService.getAuthToken() ? (
					<CreateContentButton forumType='rentals' />
				) : null}
			</span>
			<div className='rentals-content'>
				{context.state.rentalCatagories.map(r => (
					<Link key={r.id} to={`/rentals/${r.id}`} className='rentals-card'>
						<img src={r.img_path} alt={r.name} className='rental-cat-img' />
						<span className='rentals-card-text'>{r.name}</span>
					</Link>
				))}
			</div>
		</section>
	);
}
