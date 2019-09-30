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
	makeEvent = events => {
		let currEvent = [];
		events.filter(e =>
			e.eventId.toString() === this.state.eventId ? currEvent.push(e) : null
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
					{this.context.user.id === e.userId ? (
						<button type='button' onClick={this.handleDeleteEvent}>
							Delete Event
						</button>
					) : null}
				</div>
			);
		});
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
				{this.state.showDeletePopUp ? (
					deleteEventPopUp
				) : (
					<ForumContext.Consumer>
						{context => this.makeEvent(context.events)}
					</ForumContext.Consumer>
				)}
			</div>
		);
	}
}
