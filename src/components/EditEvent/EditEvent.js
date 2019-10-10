import React, { Component } from 'react';
import ForumContext from '../../ForumContext';
import './EditEvent.css';

export default class EditEvent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: this.props.event.id,
			title: this.props.event.title,
			location: this.props.event.location,
			description: this.props.event.description,
			eventdate: this.props.event.eventdate,
			startTime: '',
			endTime: ''
		};
	}
	static contextType = ForumContext;
	resetState = () => {
		this.setState({
			title: '',
			location: '',
			description: '',
			eventdate: '',
			startTime: '',
			endTime: ''
		});
	};
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
			eventdate: e.target.value
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
		const { startTime, endTime } = this.state;
		var eventtime = [startTime, endTime];
		eventtime = eventtime.join(' - ');
		const { id, title, location, eventdate, description } = this.state;
		const eventToUpdate = {
			id,
			title,
			location,
			eventdate,
			eventtime,
			description
		};
		this.context.editEvent(eventToUpdate);
		this.setState({
			redirect: true
		});
	};
	eventTimeSelect = () => {
		const times = [
			'All Day',
			'Morning',
			'Mid Day',
			'Afternoon',
			'Evening',
			'Until Late',
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
		return times.map(t => (
			<option key={t} value={t}>
				{t}
			</option>
		));
	};
	componentDidMount() {
		const splitEventTime = this.props.event.eventtime.split(' - ');
		this.setState({
			startTime: splitEventTime[0],
			endTime: splitEventTime[1]
		});
	}

	render() {
		if (this.state.redirect) {
			this.props.showEditPopUp();
		}

		return (
			<section className='create-event-container'>
				<div className='create-event-content'>
					{' '}
					<form onSubmit={this.handleSubmit}>
						<label htmlFor='eventTitle'>Event Title</label>
						<input
							type='text'
							name='eventTitle'
							id='event-title'
							value={this.state.title}
							onChange={this.handleEventTitle}
							autoFocus
							required
						/>
						<label htmlFor='eventLocation'>Event Location</label>
						<input
							type='text'
							name='eventLocation'
							id='event-location'
							value={this.state.location}
							onChange={this.handleLocation}
							required
						/>
						<label htmlFor='eventDate'>Event Date</label>
						<input
							type='date'
							name='eventDate'
							id='event-date'
							value={this.state.eventdate}
							min={this.state.eventdate}
							onChange={this.handleDate}
							required
						/>
						<label htmlFor='eventStartTime'>Event Start Time</label>
						<select
							name='eventStartTime'
							id='event-start-time'
							value={this.state.startTime}
							onChange={this.handleStartTime}>
							{this.eventTimeSelect()}
						</select>
						<label htmlFor='eventEndTime'>Event End Time</label>
						<select
							name='eventEndTime'
							id='event-end-time'
							value={this.state.endTime}
							onChange={this.handleEndTime}>
							{this.eventTimeSelect()}
						</select>
						<label htmlFor='eventDescription'>Event Description</label>
						<textarea
							name='eventDescritption'
							id='event-description'
							value={this.state.description}
							onChange={this.handleDescription}
						/>
						<button type='submit'>Save Changes</button>
						<button type='button' onClick={this.resetState}>
							Clear Form
						</button>
						<button type='button' onClick={this.props.showEditPopUp}>
							Cancel
						</button>
					</form>
				</div>
			</section>
		);
	}
}
