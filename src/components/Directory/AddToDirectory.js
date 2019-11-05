import React from 'react';

export default function AddToDirectory(props) {
	return (
		<button
			className='add-to-directory'
			type='button'
			onClick={props.showAddForm}>
			<i class="far fa-address-card"></i>
			Create Listing
		</button>
	);
}
