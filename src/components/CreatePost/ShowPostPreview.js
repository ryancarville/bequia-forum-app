import React, { useContext } from 'react';
import formatDate from '../../helpers/formatDate';
import './ShowPostPreview.css';
import ForumContext from '../../ForumContext';

export default function ShowPostPreview(props) {
	const context = useContext(ForumContext);
	const forumTitle = context.state.forum.find(
		f => f.id === parseInt(props.state.boardid)
	);
	console.log(props.state.boardid);
	return (
		<div className='create-post-preview'>
			<h2>Posting in {forumTitle.name}</h2>
			<h3>{props.state.title}</h3>

			<p>{props.state.content}</p>

			<p>Posted By: {props.state.author}</p>
			<p>Posted On: {formatDate(props.state.date)}</p>
			<span>
				<button onClick={() => props.handleSubmit()}>Create Listing</button>
				<button onClick={props.handleShowPreview}>Edit</button>
				<button onClick={() => props.goBack()}>Cancel</button>
			</span>
		</div>
	);
}
