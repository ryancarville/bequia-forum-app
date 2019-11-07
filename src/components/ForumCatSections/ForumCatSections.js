import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './ForumCatSections.css';
import ForumContext from '../../ForumContext';
import apiServices from '../../services/apiServices';

export default class ForumCatSections extends Component {
	title = forumTitles => {
		const name = forumTitles.filter(
			title => title.id.toString() === this.props.match.params.forumCatId
		);

		if (!name[0]) {
			return localStorage.getItem('forumTitle');
		} else {
			localStorage.setItem('forumTitle', name[0].name);
			return name[0].name;
		}
	};

	render() {
		return (
			<section className='forum-cat-sections-container'>
				<ForumContext.Consumer>
					{context => (
						<div className='forum-cat-sections-content'>
							<header>
								<h3>{this.title(context.state.forumTitles)}</h3>
							</header>
							<ul>
								{context.state.forum
									.filter(
										forum =>
											forum.messageboard_section.toString() ===
											this.props.match.params.forumCatId
									)
									.map(item => {
										setTimeout(() => {
											apiServices
												.getNumOfThreads(item.id)
												.then(numOfThreads => {
													document.getElementById(
														`thread-count-${item.id}`
													).innerText = numOfThreads[0].count;
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
														<p id={`thread-count-${item.id}`}>
															<img
																src='../../icons/JPEG/wave-loader.svg'
																alt='wave-loader'
																id='wave-loader-gif'
															/>
														</p>
													</span>
												</Link>
											</li>
										);
									})}
							</ul>
						</div>
					)}
				</ForumContext.Consumer>
			</section>
		);
	}
}
