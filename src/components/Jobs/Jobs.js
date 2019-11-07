import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ForumContext from '../../ForumContext';
import TokenService from '../../services/TokenServices';
import CreateContentButton from '../CreateContentButton/CreateContentButton';
import './Jobs.css';

export default function Jobs(props) {
	const context = useContext(ForumContext);
	const jobCatagories = context.state.jobCatagories.map(j => (
		<div className='job-card'>
			<Link key={j.id} to={`/jobs/${j.id}`}>
				<img className='job-cat-icon' src={j.img_url} alt={j.name + '-icon'} />
				<h3>{j.name}</h3>
				<p>{j.description}</p>
			</Link>
		</div>
	));
	return (
		<>
			<section className='jobs-container'>
				<div>
					<h2>Jobs</h2>
					{TokenService.getAuthToken() ? (
						<CreateContentButton forumType='jobs' />
					) : null}
				</div>
				<div className='jobs-content'>{jobCatagories}</div>
			</section>
		</>
	);
}
