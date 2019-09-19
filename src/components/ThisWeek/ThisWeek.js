import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './ThisWeek.css';
import ForumContext from '../../ForumContext';

export default function ThisWeek() {
	const context = useContext(ForumContext);
	const today = new Date();
	let dayInt = today.getDate();
	let month = today.getMonth();
	let year = today.getFullYear();

	function thisWeeksEvents() {
		let events = [];

		context.events.forEach(e => {
			const eventDate = e.date.split('-');
			const eventYear = eventDate[0];
			const eventMonth = eventDate[1];
			const eventDay = eventDate[2];

			if (
				eventDay >= dayInt.toString() &&
				eventDay <= (dayInt + 6).toString() &&
				eventMonth === (month + 1).toString() &&
				eventYear === year.toString()
			) {
				events.push(e);
			} else {
				return null;
			}
		});

		function formatDate(imageDate) {
			const date = new Date(imageDate);
			const formatted_date = new Intl.DateTimeFormat('en-US').format(date);
			return formatted_date;
		}
		let upcomingEvents = events.map(e => {
			return (
				<div className='event' key={e.eventId}>
					<span key={e.eventId}>
						<Link to={`/events/${e.eventId}`}>{e.title}</Link>
						<p>Where: {e.location}</p>
						<p>When: {formatDate(e.date)}</p>
						<p>Time: {e.time}</p>
					</span>
					<p>{e.description}</p>
				</div>
			);
		});

		return upcomingEvents;
	}

	return (
		<div className='thisWeek-container'>
			<div className='thisWeek-content'>
				<h3>Upcoming Events</h3>
				{thisWeeksEvents()}
			</div>
		</div>
	);
}
