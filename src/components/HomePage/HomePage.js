import React, { Component } from 'react';
import ForumContext from '../../ForumContext';
import './HomePage.css';
import NewPost from '../NewPost/NewPost';
import ThisWeek from '../ThisWeek/ThisWeek';

export default class HomePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null
		};
	}
	dateFormat = date => {
		const newDate = new Date(date);
		const formatted_date = new Intl.DateTimeFormat('en-US').format(newDate);
		return formatted_date;
	};
	render() {
		return (
			<ForumContext.Consumer>
				{context => (
					<div className='home-page-container'>
						<div className='home-page-content'>
							<section id='home-page-newest-post'>
								<NewPost />
							</section>
							<section id='home-page-upcoming-events'>
								<ThisWeek />
							</section>
						</div>
					</div>
				)}
			</ForumContext.Consumer>
		);
	}
}
