import React, { Component } from 'react';
import Calendar from '../Calendar/Calendar';
import './Events.css';

export default class Events extends Component {
	render() {
		return (
			<div className='events-container'>
				<div className='events-content'>
					<Calendar />
				</div>
			</div>
		);
	}
}
