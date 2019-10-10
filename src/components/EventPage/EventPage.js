import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import ForumContext from '../../ForumContext';
import MakeEvent from './makeEvent';
import EditEvent from '../EditEvent/EditEvent';
import DeletePopUp from '../DeletePopUp/DeletePopUp';
import './EventPage.css';

export default class EventPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: this.props.match.params.eventId,
			showEditPopUp: false,
			showDeletePopUp: false,
			redirect: false
		};
	}
	static contextType = ForumContext;
	showEditPopUp = () => {
		this.setState({
			showEditPopUp: !this.state.showEditPopUp
		});
	};
	showDeletePopUp = () => {
		this.setState({
			showDeletePopUp: !this.state.showDeletePopUp
		});
	};
	handleDelete = () => {
		const { id } = this.state;
		this.context.deleteEvent(id);
		this.setState({
			redirect: !this.state.redirect
		});
	};

	render() {
		const event = this.context.state.events.filter(
			e => e.id.toString() === this.state.id
		);
		if (this.state.redirect) {
			return <Redirect to={'/events'} />;
		}
		return (
			<div className='event-page-container'>
				{this.state.showDeletePopUp ? (
					<DeletePopUp
						eventTitle={event[0].title}
						showDeletePopUp={this.showDeletePopUp}
						handleDelete={this.handleDelete}
					/>
				) : null}
				{this.state.showEditPopUp ? (
					<EditEvent event={event[0]} showEditPopUp={this.showEditPopUp} />
				) : (
					<MakeEvent
						eventId={this.state.id}
						showEditPopUp={this.showEditPopUp}
						showDeletePopUp={this.showDeletePopUp}
					/>
				)}
			</div>
		);
	}
}
