import React from 'react';
import deleteIcon from '../Icons/delete';
import './deleteButton.css';
//delete button for all delete events
export default function deleteButton(props) {
	return (
		<button type='button' onClick={() => props.showDeletePopUp(props.id)} id='delete-button'>
			{deleteIcon}
		</button>
	);
}
