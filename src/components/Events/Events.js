import React, { Component } from 'react';
import './Events.css';
import ForumContext from '../../ForumContext';
import Calendar from '../Calendar/Calendar';

export default class Events extends Component {
	render() {
		return (
			<div className='events-container'>
				<div className='events-content'>
					<ForumContext.Consumer>
						{context => <Calendar events={context.events} />}
					</ForumContext.Consumer>
				</div>
			</div>
		);
	}
}
