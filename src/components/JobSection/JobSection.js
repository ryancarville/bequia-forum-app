import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Truncate from 'react-truncate';
import formatDate from '../../helpers/formatDate';
import './JobSection.css';
import ForumContext from '../../ForumContext';

export default function JobPage(props) {
	const context = useContext(ForumContext);
	const jobTypeId = props.match.params.jobTypeId;
	const jobPosts = context.state.jobPosts
		.filter(job => job.jobcat.toString() === jobTypeId)
		.map(j => (
			<li key={j.id}>
				<Link
					to={{
						pathname: `/jobs/${jobTypeId}/${j.id}`,
						state: { job: j }
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
									state: { job: j }
								}}>
								Read more
							</Link>
						</span>
					}>
					<p>{j.description}</p>
				</Truncate>
				<span className='postInfo'>
					<p>Posted By: {j.username}</p>
					<p>Posted On: {formatDate(j.dateposted)}</p>
				</span>
			</li>
		));
	return (
		<section className='job-section-container'>
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
