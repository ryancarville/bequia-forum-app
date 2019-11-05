import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Forum.css';

import ForumContext from '../../ForumContext';

export default class Forum extends Component {
	makeForum = forumTitles => {
		let links = [];
		forumTitles.forEach(title => {
			if (title.name === 'Jobs') {
				links.push(
					<Link to={'/jobs'} className='section-menu-link' key={title.id}>
						{title.name}
						<i className='fas fa-briefcase'></i>
					</Link>
				);
			}
			if (title.name === 'Marekt Place') {
				links.push(
					<Link
						className='section-menu-link'
						to={'/marketPlace'}
						key={title.id}>
						{title.name}
						<i className='fas fa-store'></i>
					</Link>
				);
			}
			if (title.name === 'Rentals') {
				links.push(
					<Link to={'/rentals'} className='section-menu-link' key={title.id}>
						{title.name}
						<i className='fas fa-home'></i>
					</Link>
				);
			}
			if (title.name === 'Events') {
				links.push(
					<Link to={'/events'} className='section-menu-link' key={title.id}>
						{title.name}
						<i className='far fa-calendar-alt'></i>
					</Link>
				);
			}
			if (title.name === 'Life on Bequia') {
				links.push(
					<Link
						to={`/messageBoard/${title.id}`}
						className='section-menu-link'
						key={title.id}>
						{title.name}
						<i className='fas fa-umbrella-beach'></i>
					</Link>
				);
			}
			if (title.name === 'Help & Tips') {
				links.push(
					<Link
						to={`/messageBoard/${title.id}`}
						className='section-menu-link'
						key={title.id}>
						{title.name}
						<i className='fas fa-people-carry'></i>
					</Link>
				);
			}
			if (title.name === 'Activites') {
				links.push(
					<Link
						to={`/messageBoard/${title.id}`}
						className='section-menu-link'
						key={title.id}>
						{title.name}
						<i className='fas fa-hiking'></i>
					</Link>
				);
			}
			if (title.name === 'Off-Topic') {
				links.push(
					<Link
						to={`/messageBoard/${title.id}`}
						className='section-menu-link'
						key={title.id}>
						{title.name}
						<i className='fas fa-question'></i>
					</Link>
				);
			}
			if (title.name === 'Support') {
				links.push(
					<Link
						to={`/messageBoard/${title.id}`}
						className='section-menu-link'
						key={title.id}>
						{title.name}
						<i className='fas fa-info'></i>
					</Link>
				);
			}
		});
		return links;
	};

	render() {
		return (
			<section className='forum-container'>
				<header>
					<h3>Fourm</h3>
				</header>

				<ForumContext.Consumer>
					{context => (
						<div className='forum-content'>
							<ul className='sectionMenu'>
								{this.makeForum(context.state.forumTitles)}
							</ul>
						</div>
					)}
				</ForumContext.Consumer>
			</section>
		);
	}
}
