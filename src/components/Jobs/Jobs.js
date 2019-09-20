import React, { Component } from 'react';
import Truncate from 'react-truncate';
import { Link } from 'react-router-dom';
import './Jobs.css';
import ForumContext from '../../ForumContext';
import Sort from '../Sort/Sort';

export default class Jobs extends Component {
	formatDate = imageDate => {
		const date = new Date(imageDate);
		const formatted_date = new Intl.DateTimeFormat('en-US').format(date);
		return formatted_date;
	};
	jobListings = jobs => {
		const listing = jobs.map(j => {
			return (
				<div className='job-listing'>
					<ul>
						<h4>
							<Link
								to={{
									pathname: `/jobs/${j.jobId}`,
									state: {
										job: { j }
									}
								}}>
								{j.title}
							</Link>
						</h4>
						<li>Position: {j.position}</li>
						<li>Location: {j.location}</li>
						<li>
							<Truncate
								lines={1}
								ellipsis={
									<span>
										...
										<Link
											to={{
												pathname: `/jobs/${j.jobId}`,
												state: {
													job: { j }
												}
											}}>
											Read more
										</Link>
									</span>
								}>
								{j.description}
							</Truncate>
						</li>
						<li>Posted: {this.formatDate(j.datePosted)}</li>
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
						<Sort sortType={'jobs'} handleSort={context.sort} />
						<div className='jobs-content'>{this.jobListings(context.jobs)}</div>
					</div>
				)}
			</ForumContext.Consumer>
		);
	}
}
