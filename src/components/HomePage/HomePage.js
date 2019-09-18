import React, { Component } from 'react';
import ForumContext from '../../ForumContext';
import './HomePage.css';

export default class HomePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null
		};
	}
	dateFormat = (date) => {
		const newDate = new Date(date);
		const formatted_date = new Intl.DateTimeFormat('en-US').format(newDate);
		return formatted_date;
	};
	render() {
		return (
			<ForumContext.Consumer>
				{context => (
					<div className='homePage-container'>
						<div classname='homePage-content'>
							<h3>HomePage</h3>
							<p>{context.user.name}</p>
							<p>Last logged in: {this.dateFormat(context.user.lastLogin)}</p>
						</div>
					</div>
				)}
			</ForumContext.Consumer>
		);
	}
}
