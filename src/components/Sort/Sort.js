import React from 'react';
import './Sort.css';

export default function Sort(props) {
	return (
		<form className='sortForm' onChange={props.handleSort}>
			<label htmlFor='sort'>Sort: </label>
			<select name='sort' id='selectSort'>
				<option value='newest'>Newest</option>
                <option value='oldest'>Oldest</option>
                <option value='likes-asc'>Most Likes</option>
				<option value='likes-dec'>Least Likes</option>
			</select>
		</form>
	);
}
