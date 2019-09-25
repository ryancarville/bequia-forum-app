import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './CreateEvent.css';
import ForumContext from '../../ForumContext';
export default class CreateEvent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			eventId: Math.floor(Math.random() * 10000000),
			title: '',
			date: new Date().toISOString().slice(0, 10),
			startTime: '',
			endTime: '',
			location: '',
			description: '',
			postedBy: ''
		};
	}
	static contextType = ForumContext;
	handleEventTitle = e => {
		this.setState({
			title: e.target.value
		});
	};
	handleDescription = e => {
		this.setState({
			description: e.target.value
		});
	};
	handleLocation = e => {
		this.setState({
			location: e.target.value
		});
	};
	handleDate = e => {
		this.setState({
			date: e.target.value
		});
	};
	handleStartTime = e => {
		this.setState({
			startTime: e.target.value
		});
	};
	handleEndTime = e => {
		this.setState({
			endTime: e.target.value
		});
	};
	handleSubmit = e => {
		e.preventDefault();
		const time = this.state.startTime + ' - ' + this.state.endTime;
		const { eventId, title, location, date, description } = this.state;
		const newEvent = { eventId, title, location, date, time, description };
		this.context.createEvent(newEvent);
		this.setState({
			redirectToCalendar: true
		});
	};
	eventTimeSelect = () => {
		const times = [
			'00:00',
			'00:30',
			'01:00',
			'01:30',
			'02:00',
			'02:30',
			'03:00',
			'03:30',
			'04:00',
			'04:30',
			'05:00',
			'05:30',
			'06:00',
			'06:30',
			'07:00',
			'07:30',
			'08:00',
			'08:30',
			'09:00',
			'09:30',
			'10:00',
			'10:30',
			'11:00',
			'11:30',
			'12:00',
			'12:30',
			'13:00',
			'13:30',
			'14:00',
			'14:30',
			'15:00',
			'15:30',
			'16:00',
			'16:30',
			'17:00',
			'17:30',
			'18:00',
			'18:30',
			'19:00',
			'19:30',
			'20:00',
			'20:30',
			'21:00',
			'21:30',
			'22:00',
			'22:30',
			'23:00',
			'23:30'
		];
		return times.map(t => <option value={t}>{t}</option>);
	};
	render() {
		console.log(new Date().toISOString().slice(0, 10));
		if (this.state.redirectToCalendar) {
			return <Redirect to={'/events'} />;
		}
		const eventForm = (
			<form onSubmit={this.handleSubmit}>
				<label htmlFor='eventTitle'>Event Title</label>
				<input
					type='text'
					name='eventTitle'
					id='event-title'
					onChange={this.handleEventTitle}
					autoFocus
					required
				/>
				<label htmlFor='eventLocation'>Event Location</label>
				<input
					type='text'
					name='eventLocation'
					id='event-location'
					onChange={this.handleLocation}
					required
				/>
				<label htmlFor='eventDate'>Event Date</label>
				<input
					type='date'
					name='eventDate'
					id='event-date'
					value={this.state.date}
					min={this.state.date}
					onChange={this.handleDate}
					required
				/>
				<label htmlFor='eventStartTime'>Event Start Time</label>
				<select
					name='eventStartTime'
					id=''
					event-start-time
					onChange={this.handleStartTime}>
					{this.eventTimeSelect()}
				</select>
				<label htmlFor='eventEndTime'>Event End Time</label>
				<select
					name='eventEndTime'
					id=''
					event-end-time
					onChange={this.handleEndTime}>
					{this.eventTimeSelect()}
				</select>
				<label htmlFor='eventDescription'>Event Description</label>
				<textarea
					name='eventDescritption'
					id='event-description'
					onChange={this.handleDescription}
				/>
				<button type='submit'>Create Event</button>
				<button type='reset'>Clear Form</button>
				<button type='button' onClick={() => this.props.history.goBack()}>
					Cancel
				</button>
			</form>
		);
		return (
			<section className='create-event-container'>
				<div className='create-event-content'> {eventForm}</div>
			</section>
		);
	}
}
