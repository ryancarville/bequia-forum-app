import React, { useContext } from 'react';
import formatDate from '../../helpers/formatDate';
import ForumContext from '../../ForumContext';
import EditButton from '../Buttons/Edit';
import TokenServices from '../../services/TokenServices';

export default function MakeEvent(props) {
	const context = useContext(ForumContext);
	const events = context.state.events;
	const eventId = props.eventId;
	console.log(events);
	return events
		.filter(e => e.id.toString() === eventId)
		.map(e => (
			<article className='event-page-content' key={e.id}>
				<span key={e.id}>
					<h3>{e.title}</h3>
					<p>Where: {e.location}</p>
					<p>When: {formatDate(e.eventdate)}</p>
					<p>Time: {e.eventtime}</p>
				</span>
				<p id='event-description'>{e.description}</p>
				{TokenServices.getAuthToken() ? (
					context.user.id === e.userid ? (
						<>
							<button type='button' onClick={props.showDeletePopUp}>
								Delete Event
							</button>
							<EditButton type={'event'} showEditPopUp={props.showEditPopUp} />
						</>
					) : null
				) : null}
			</article>
		));
}
