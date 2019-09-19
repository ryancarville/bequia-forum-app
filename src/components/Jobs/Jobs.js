import React, { Component } from 'react';
import './Jobs.css';
import ForumContext from '../../ForumContext';
import Sort from '../Sort/Sort';

export default class Jobs extends Component {
	jobListings = jobs => {
		const listing = jobs.map(j => {
			return (
				<div className='job-listing'>
					<ul>
						<h4>{j.title}</h4>
						<li>Position: {j.position}</li>
						<li>Location: {j.location}</li>
						<li>Job Description: {j.description}</li>
						<li>Contact: {j.contact.name}</li>
						<li>
							Email: <a href={`mailto:${j.contact.email}`}>{j.contact.email}</a>
						</li>
						<li>Phone: {j.contact.phone}</li>
						<li>Posted: {j.datePosted}</li>
					</ul>
				</div>
			);
		});
		return listing;
	};
	render() {
		return (
			<ForumContext.Consumer>
				{context => (
					<div className='jobs-container'>
						<Sort jobs={'jobs'} handleSort={context.sort} />
						<div className='jobs-content'>{this.jobListings(context.jobs)}</div>
					</div>
				)}
			</ForumContext.Consumer>
		);
	}
}
