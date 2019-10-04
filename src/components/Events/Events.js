import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Calendar from '../Calendar/Calendar';
import './Events.css';
import ForumContext from '../../ForumContext';
import CreateContentButton from '../CreateContentButton/CreateContentButton';
import TokenServices from '../../services/TokenServices';

class Events extends Component {
	render() {
		return (
			<>
				{TokenServices.getAuthToken() ? (
					<CreateContentButton forumType='events' />
				) : null}
				<div className='events-container'>
					<h2>Events Calendar</h2>

					<div className='events-content'>
						<ForumContext.Consumer>
							{context => <Calendar events={context.events} />}
						</ForumContext.Consumer>
					</div>
				</div>
			</>
		);
	}
}
export default withRouter(Events);
