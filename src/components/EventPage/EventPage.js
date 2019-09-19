import React from 'react';
import { withRouter } from 'react-router-dom';
import './EventPage.css';
function EventPage(props) {
	function formatDate(imageDate) {
		const date = new Date(imageDate);
		const formatted_date = new Intl.DateTimeFormat('en-US').format(date);
		return formatted_date;
	}
	const events = props.events;

	function makeEvent() {
		let currEvent = [];
		events.find(e =>
			e.eventId.toString() === props.match.params.eventId
				? currEvent.push(e)
				: null
		);
		return currEvent.map(e => {
			return (
				<div className='event-page-content' key={e.eventId}>
					<span key={e.eventId}>
						<h3>{e.title}</h3>
						<p>Where: {e.location}</p>
						<p>When: {formatDate(e.date)}</p>
						<p>Time: {e.time}</p>
					</span>
					<p id='event-description'>{e.description}</p>
				</div>
			);
		});
	}
	return <div className='event-page-container'>{makeEvent()}</div>;
}

export default withRouter(EventPage);
