import React, { Component } from 'react';
import './Directory.css';
import ForumContext from '../../ForumContext';
import Sort from '../Sort/Sort';

export default class Directory extends Component {
	directory = dir => {
		const listings = dir.map(d => {
			const userFullName = d.userFName + ' ' + d.userLName;
			return (
				<div className='directory-listing' key={d.userId}>
					<ul>
						<h4>{userFullName}</h4>
						<li>
							Email: <a href={`mailto:${d.email}`}>{d.email}</a>
						</li>

						<li>Telephone: {d.phone}</li>
						<li>
							Website:{' '}
							<a href={d.website} target='_blank' rel='noopener noreferrer'>
								{d.website}
							</a>
						</li>
					</ul>
				</div>
			);
		});
		return listings;
	};
	render() {
		return (
			<div className='directory-container'>
				<h2>Directory</h2>
				<ForumContext.Consumer>
					{context => (
						<>
							<Sort handleSort={context.sort} dir={'dir'} />
							<div className='directory-content'>
								{this.directory(context.directory)}
							</div>
						</>
					)}
				</ForumContext.Consumer>
			</div>
		);
	}
}
