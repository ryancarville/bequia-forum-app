import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './ForumCatSections.css';

import apiServices from '../../services/apiServices';
function ForumCatSections(props) {
	const title = props.forumTitles.find(
		title => title.id.toString() === props.match.params.forumCatId
	);
	return (
		<section className='forum-cat-sections-container'>
			<div className='forum-cat-sections-content'>
				<header>{title.name}</header>
				<ul>
					{props.sections
						.filter(
							forum =>
								forum.messageboard_section.toString() ===
								props.match.params.forumCatId
						)
						.map(item => {
							setTimeout(() => {
								apiServices.getNumOfThreads(item.id).then(numOfThreads => {
									document.getElementById(`thread-count-${item.id}`).innerText =
										numOfThreads[0].count;
								});
								return;
							}, 50);
							return (
								<li key={item.id} className='section-cat-item'>
									<Link
										to={`/messageBoard/${item.messageboard_section}/${item.id}`}>
										<div className='section-text'>
											<h4>{item.name}</h4>
											<p>{item.description}</p>
										</div>
										<span className='thread-count'>
											<i className='far fa-file-alt'></i>
											<p id={`thread-count-${item.id}`}>counting...</p>
										</span>
									</Link>
								</li>
							);
						})}
				</ul>
			</div>
		</section>
	);
}
export default withRouter(ForumCatSections);
