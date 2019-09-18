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

	render() {
		return (
			<ForumContext.Consumer>
				{context => (
					<div className='homePage-Page'>
						<div classname='homePage-container'>
							<h3>HomePage</h3>
							<p>{context.user.name}</p>
						</div>
					</div>
				)}
			</ForumContext.Consumer>
		);
	}
}
