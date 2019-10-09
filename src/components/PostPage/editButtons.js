import React from 'react';
import edit from '../Icons/edit';
import deleteIcon from '../Icons/delete';
export default function EditButtons(props) {
	return (
		<span className='edit-button-container'>
			<button type='button' onClick={props.showPostEdit}>
				{edit}
			</button>
			<button type='button' onClick={props.showDeletePopUp}>
				{deleteIcon}
			</button>
		</span>
	);
}
