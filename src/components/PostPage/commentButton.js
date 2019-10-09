import React from 'react';
import comment from '../Icons/comment';
export default function commentButton(props) {
	return (
		<button type='button' onClick={props.handleComment} id='add-comment-btn'>
			{comment} Comment
		</button>
	);
}
