import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Calendar from '../Calendar/Calendar';
import './Events.css';
import ForumContext from '../../ForumContext';

class Events extends Component {
	render() {
		return (
			<div className='events-container'>
				<div className='events-content'>
					<ForumContext.Consumer>
						{context => <Calendar events={context.events} />}
					</ForumContext.Consumer>
				</div>
			</div>
		);
	}
}
export default withRouter(Events);
