import React from 'react';
import './DeletePopUp.css';

export default function DeletePopUp(props) {
	return (
		<div className='post-delete-pop-up'>
			{props.title ? (
				<h3>Are you sure you want to delete post '{props.title}'?</h3>
			) : (
				<h3>Are you sure you want to delete this comment?</h3>
			)}
			<span>
				<button type='button' onClick={props.handleDelete}>
					Yes
				</button>
				<button type='button' onClick={props.showDeletePopUp}>
					No
				</button>
			</span>
		</div>
	);
}
