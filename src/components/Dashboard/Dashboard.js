import React, { Component } from 'react';
import './Dashboard.css';
import NewPost from '../NewPost/NewPost';
import ThisWeek from '../ThisWeek/ThisWeek';

export default class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			showEvents: false,
			showPosts: false
		};
	}

	showHomePageEvents = () => {
		console.log('click');
		this.setState({
			showEvents: !this.state.showEvents
		});
	};
	showNewPosts = () => {
		this.setState({
			showPosts: !this.state.showPosts
		});
	};
	render() {
		return (
			<>
				<section className='mobile-home-page-container'>
					<div className='mobile-home-page-event-content'>
						<h3 onClick={this.showHomePageEvents}>
							{this.state.showEvents ? (
								<i class='far fa-times-circle'></i>
							) : (
								'Upcoming Events'
							)}
						</h3>
						<div
							className={`${
								this.state.showEvents
									? 'mobile-home-page-events-open'
									: 'mobile-home-page-events-closed'
							}`}>
							<ThisWeek />
						</div>
						<div className='mobile-home-page-new-post-content'></div>

						<h3 onClick={this.showNewPosts}>
							{this.state.showPosts ? (
								<i class='far fa-times-circle'></i>
							) : (
								'New Posts'
							)}
						</h3>
						<div
							className={`${
								this.state.showPosts
									? 'mobile-home-page-new-posts-open'
									: 'mobile-home-page-new-posts-closed'
							}`}>
							<NewPost />
						</div>
					</div>
				</section>
				<div className='home-page-container'>
					<div className='home-page-content'>
						<section id='home-page-newest-post'>
							<NewPost />
						</section>
						<section id='home-page-upcoming-events'>
							<h3>Upcoming Events</h3>
							<ThisWeek />
						</section>
					</div>
				</div>
			</>
		);
	}
}
