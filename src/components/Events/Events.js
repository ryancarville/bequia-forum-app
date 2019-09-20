import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './Events.css';
import ForumContext from '../../ForumContext';
import CalendarLink from '../../helpers/CalendarLink';
import Calendar from '../Calendar/Calendar';

class Events extends Component {
	render() {
		return (
			<div className='events-container'>
				<div className='events-content'>
					<ForumContext.Consumer>
						{context => (
							<Calendar events={context.events} eventLink={CalendarLink} />
						)}
					</ForumContext.Consumer>
				</div>
			</div>
		);
	}
}
export default withRouter(Events);
