import React from 'react';
import deleteIcon from '../Icons/delete';
export default function deleteButton(props) {
	return (
		<button type='button' onClick={() => props.showDeletePopUp}>
			{deleteIcon}
		</button>
	);
}
