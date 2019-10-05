import React, { useContext } from 'react';
import formatDate from '../../helpers/formatDate';
import './ShowPostPreview.css';
import ForumContext from '../../ForumContext';

export default function ShowPostPreview(props) {
	const context = useContext(ForumContext);
	const fourmTitle = () => {
		let i = 0;
		while (i < context.state.forum.length) {
			var sectionArr = context.state.forum[i].find(
				f => f.forumId === parseInt(props.state.forumId)
			);
			if (sectionArr) {
				return sectionArr.title;
			}
			i++;
		}
	};

	return (
		<div className='create-post-preview'>
			<h2>Posting in {fourmTitle()}</h2>
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
