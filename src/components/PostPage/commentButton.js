import React from 'react';
import comment from '../Icons/comment';
//set comment button on post page
export default function commentButton(props) {
	return (
		<button type='button' onClick={props.handleComment} id='add-comment-btn'>
			{comment} Comment
		</button>
	);
}
