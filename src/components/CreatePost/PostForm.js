import React, { useContext } from 'react';
import './PostForm.css';
import ForumContext from '../../ForumContext';

export default function PostForm(props) {
	const context = useContext(ForumContext);
	const makeSelectCategorys = () => {
		let i = 0;
		let categorys = [];
		while (i < context.state.forum.length) {
			categorys.push(
				context.state.forum[i].map(item => {
					if (item.sectionTitle) {
						return true;
					} else {
						return (
							<option key={item.forumId} value={item.forumId}>
								{item.title}
							</option>
						);
					}
				})
			);
			i++;
		}
		return categorys;
	};
	return (
		<form onSubmit={props.handleShowPreview}>
			<label htmlFor='title'>Title</label>
			<input
				type='text'
				name='title'
				id='post-title'
				value={props.state.title}
				onChange={props.handleTitle}
				autoFocus
				required
			/>
			<label htmlFor='catagory'>Catagory</label>
			<select
				name='catagory'
				id='post-catagory'
				value={props.state.forumId}
				onChange={props.handleCatagoryPostForm}
				required>
				<option selected disabled value=''>
					Please Select a Forum
				</option>
				{makeSelectCategorys()}
			</select>
			<label htmlFor='content'>Content</label>
			<textarea
				name='content'
				id='post-content'
				value={props.state.content}
				onChange={props.handleContent}
				required></textarea>
			<button type='submit'>Preview Post</button>
			<button onClick={props.resetState}>Clear Form</button>
			<button type='button' onClick={() => props.goBack()}>
				Cancel
			</button>
		</form>
	);
}
