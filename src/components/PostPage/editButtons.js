import React from 'react';
import edit from '../Icons/edit';
import deleteIcon from '../Icons/delete';
//set edit button on post page
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
