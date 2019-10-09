import React from 'react';
import deleteIcon from '../Icons/delete';
export default function deleteButton(props) {
	console.log(props.id);
	return (
		<button type='button' onClick={() => props.showDeletePopUp(props.id)}>
			{deleteIcon}
		</button>
	);
}
