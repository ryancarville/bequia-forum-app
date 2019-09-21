import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class CalendarEventLink extends Component {
	render() {
		const event = this.props.event;
		const day = this.props.cell.innerHTML;
		const link = (
			<>
				{day}
				<Link to={`/events/${event.eventId}`}>{event.title}</Link>
			</>
		);

		return link;
	}
}
