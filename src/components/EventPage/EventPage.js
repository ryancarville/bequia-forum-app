import React, { Component } from 'react';
import ForumContext from '../../ForumContext';
import formatDate from '../../helpers/formatDate';
import './EventPage.css';

export default class EventPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			eventId: this.props.match.params.eventId,
			showDeletePopUp: false
		};
	}
	static contextType = ForumContext;

	handleDeleteEvent = () => {
		this.setState({
			showDeletePopUp: !this.state.showDeletePopUp
		});
	};
	makeEvent = () => {
		const events = this.context.state.events;
		console.log(events);
		return events
			.filter(e => e.id.toString() === this.state.eventId)
			.map(e => (
				<div className='event-page-content' key={e.eventId}>
					<span key={e.eventId}>
						<h3>{e.title}</h3>
						<p>Where: {e.location}</p>
						<p>When: {formatDate(e.eventdate)}</p>
						<p>Time: {e.eventtime}</p>
					</span>
					<p id='event-description'>{e.description}</p>
					{this.context.user.id === e.userid ? (
						<button type='button' onClick={this.handleDeleteEvent}>
							Delete Event
						</button>
					) : null}
				</div>
			));
	};
	render() {
		const deleteEventPopUp = (
			<section className='delete-event-pop-up'>
				<h3>Do you really want to delete this event?</h3>
				<button
					type='button'
					onClick={() => this.context.deleteEvent(this.state.eventId)}>
					Yes
				</button>
				<button type='button' onClick={this.handleDeleteEvent}>
					No
				</button>
			</section>
		);
		return (
			<div className='event-page-container'>
				{this.state.showDeletePopUp ? deleteEventPopUp : this.makeEvent()}
			</div>
		);
	}
}
