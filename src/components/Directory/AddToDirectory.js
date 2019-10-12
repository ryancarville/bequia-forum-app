import React from 'react';

export default function AddToDirectory(props) {
	return (
		<button type='button' onClick={props.showAddForm}>
			Create Directory Listing
		</button>
	);
}
