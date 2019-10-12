import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Truncate from 'react-truncate';
import formatDate from '../../helpers/formatDate';
import './JobSection.css';
import ForumContext from '../../ForumContext';
import Sort from '../Sort/Sort';

export default function JobPage(props) {
	const context = useContext(ForumContext);
	const jobTypeId = props.match.params.jobTypeId;
	const jobPosts = context.state.jobPosts
		.filter(job => job.job_cat.toString() === jobTypeId)
		.map(j => (
			<li key={j.id}>
				<Link
					to={{
						pathname: `/jobs/${jobTypeId}/${j.id}`,
						state: { id: j.id }
					}}>
					<h3>{j.title}</h3>
				</Link>
				<Truncate
					lines={1}
					ellipsis={
						<span>
							...
							<Link
								to={{
									pathname: `/jobs/${jobTypeId}/${j.id}`,
									state: { id: j.id }
								}}>
								Read more
							</Link>
						</span>
					}>
					<p>{j.description}</p>
				</Truncate>
				<span className='postInfo'>
					{j.location ? <p>Location: {j.location}</p> : null}
					{j.employment ? <p>Employment: {j.employment}</p> : null}
					<p>Posted By: {j.user_name}</p>
					<p>Posted On: {formatDate(j.date_posted)}</p>
				</span>
			</li>
		));
	return (
		<section className='job-section-container'>
			<Sort sortType='jobs' />
			<div className='job-section-content'>
				<ul>
					{jobPosts.length !== 0 ? (
						jobPosts
					) : (
						<p>Currently there are no job postings.</p>
					)}
				</ul>
			</div>
		</section>
	);
}
