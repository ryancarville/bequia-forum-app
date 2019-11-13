import React from 'react';

export default function AddToDirectory(props) {
	return (
		<button
			className='add-to-directory'
			type='button'
			onClick={props.showAddForm}>
			<i className='far fa-address-card' samesite='none'></i>
			Create Listing
		</button>
	);
}
