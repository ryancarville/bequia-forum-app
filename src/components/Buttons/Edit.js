import React from 'react';
import editIcon from '../Icons/edit';
import './Edit.css';
export default function EditButton(props) {
	return (
		<>
			{props.type === 'event' ? (
				<button
					className='edit-btn'
					type='button'
					onClick={props.showEditPopUp}>
					Edit Event
				</button>
			) : null}
			{props.type === 'job' ? (
				<button
					className='edit-btn'
					type='button'
					onClick={props.showEditPopUp}>
					Edit Job
				</button>
			) : null}
			{props.type === 'rental' ? (
				<button
					className='edit-btn'
					type='button'
					onClick={props.showEditPopUp}>
					{editIcon}
				</button>
			) : null}
			{props.type === 'marketPlace' ? (
				<button
					className='edit-btn'
					type='button'
					onClick={props.showEditPopUp}>
					Edit Listing
				</button>
			) : null}
		</>
	);
}
