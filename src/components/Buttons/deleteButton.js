import React from 'react';
import deleteIcon from '../Icons/delete';
import './deleteButton.css';
export default function deleteButton(props) {
	return (
		<button type='button' onClick={() => props.showDeletePopUp(props.id)} id='delete-button'>
			{deleteIcon}
		</button>
	);
}
