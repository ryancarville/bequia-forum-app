import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import Nav from '../components/Nav/Nav';
import LandingPage from '../components/LandingPage/LandingPage';
import SingUp from '../components/SignUp/SignUp';
import LogIn from '../components/LogIn/LogIn';
import HomePage from '../components/HomePage/HomePage';
import NewPosts from '../components/NewPost/NewPost';
import Forum from '../components/Forum/Forum';
import ForumSection from '../components/ForumSection/ForumSection';
import PostPage from '../components/PostPage/PostPage';
import CreatePost from '../components/CreatePost/CreatePost';
import Events from '../components/Events/Events';
import CreateEvent from '../components/CreateEvent/CreateEvent';
import EventPage from '../components/EventPage/EventPage';
import Directory from '../components/Directory/Directory';
import NoPath from '../components/404/404';

export default class Router extends Component {
	render() {
		return (
			<>
				<Nav />
				<Switch>
					<PrivateRoute path='/homePage' component={HomePage} exact />
					<Route path='/' component={LandingPage} exact />
					<Route path='/signup' component={SingUp} exact />
					<Route path='/login' component={LogIn} exact />
					<Route path='/new-post' component={NewPosts} exact />
					<Route path='/messageBoard/:forumId' component={ForumSection} exact />
					<Route path='/messageBoard' component={Forum} exact />
					<Route
						path='/messageBoard/:forumId/:postId'
						component={PostPage}
						exact
					/>

					<Route path='/createPost' component={CreatePost} exact />
					<Route path='/events' component={Events} exact />
					<Route path='/createEvent' component={CreateEvent} exact />
					<Route path='/events/:eventId' component={EventPage} exact />
					<Route path='/directory' component={Directory} exact />
					<Route component={NoPath} />
				</Switch>
			</>
		);
	}
}
