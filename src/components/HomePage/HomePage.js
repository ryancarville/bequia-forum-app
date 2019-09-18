import React, { Component } from 'react';
import ForumContext from '../../ForumContext';
import './HomePage.css';
import NewPost from '../NewPost/NewPost';
import Calendar from '../Calendar/Calendar';

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
					<div className='homePage-container'>
						<div className='homePage-content'>
							<NewPost />
							<Calendar />
						</div>
					</div>
				)}
			</ForumContext.Consumer>
		);
	}
}
