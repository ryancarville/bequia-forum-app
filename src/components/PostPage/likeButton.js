import React from 'react';
import like from '../Icons/like';
export default function likeButtons(props) {
	return props.didLike ? (
		<button type='button' onClick={props.handleLike} id='coconut-likes-btn'>
			{like} Unlike
		</button>
	) : (
		<button type='button' onClick={props.handleLike} id='coconut-likes-btn'>
			{like} Like
		</button>
	);
}
