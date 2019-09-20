import React from 'react';
import './JobPage.css';

export default function JobPage(props) {
	function formatDate(imageDate) {
		const date = new Date(imageDate);
		const formatted_date = new Intl.DateTimeFormat('en-US').format(date);
		return formatted_date;
	}
	const listing = (
		<section className='job-page-listing'>
			<div>
				<h3>{props.location.state.job.j.title}</h3>
				<h4>Where: {props.location.state.job.j.location}</h4>
				<h4>Postition: {props.location.state.job.j.position}</h4>
				<p>{props.location.state.job.j.description}</p>
				<span>
					Contact Information: <br />
					<p>
						Email:{' '}
						<a href={`mailto:${props.location.state.job.j.contact.email}`}>
							{props.location.state.job.j.contact.email}
						</a>
					</p>
					<p>Phone: {props.location.state.job.j.contact.phone}</p>
				</span>
				<h5>
					Posted By: {props.location.state.job.j.contact.name} on{' '}
					{formatDate(props.location.state.job.j.datePosted)}
				</h5>
			</div>
		</section>
	);
	return listing;
}
