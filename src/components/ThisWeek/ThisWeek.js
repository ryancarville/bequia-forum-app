import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './ThisWeek.css';
import ForumContext from '../../ForumContext';
import formatDate from '../../helpers/formatDate';

export default function ThisWeek() {
	const context = useContext(ForumContext);
	const monthNums = [
		'01',
		'02',
		'03',
		'04',
		'05',
		'06',
		'07',
		'08',
		'09',
		'10',
		'11',
		'12'
	];
	const today = new Date();
	let dayInt = today.getDate();
	let month = monthNums[today.getMonth()];
	let year = today.getFullYear();

	const thisWeeksEvents = () => {
		let events = [];
		context.state.events.forEach(e => {
			const eventDate = e.date.split('-');
			const eventYear = eventDate[0];
			const eventMonth = eventDate[1];
			const eventDay = eventDate[2];
			if (
				eventDay >= dayInt.toString() &&
				eventDay <= (dayInt + 6).toString() &&
				eventMonth === month &&
				eventYear === year.toString()
			) {
				events.push(e);
			}
		});

		let upcomingEvents =
			events.length !== 0 ? (
				events.map(e => {
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
				})
			) : (
				<p>Currently there are no events for this week.</p>
			);

		return upcomingEvents;
	};

	return (
		<div className='thisWeek-container'>
			<div className='thisWeek-content'>{thisWeeksEvents()}</div>
		</div>
	);
}
