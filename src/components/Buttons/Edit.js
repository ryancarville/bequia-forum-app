import React from 'react';

export default function EditButton(props) {
	return (
		<>
			{props.type === 'event' ? (
				<button type='button' onClick={props.showEditPopUp}>
					Edit Event
				</button>
			) : null}
			{props.type === 'job' ? (
				<button type='button' onClick={props.showEditPopUp}>
					Edit Job
				</button>
			) : null}
			{props.type === 'rental' ? (
				<button type='button' onClick={props.showEditPopUp}>
					Edit Rental
				</button>
			) : null}
			{props.type === 'marketPlace' ? (
				<button type='button' onClick={props.showEditPopUp}>
					Edit Listing
				</button>
			) : null}
		</>
	);
}
