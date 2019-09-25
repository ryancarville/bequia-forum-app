import React from 'react';
import { Link } from 'react-router-dom';
import './CreateEventButton.css';
const createEventButton = (
	<span id='create-event-button'>
		<Link to={`/createEvent`}>Create Event</Link>
	</span>
);
export default createEventButton;
