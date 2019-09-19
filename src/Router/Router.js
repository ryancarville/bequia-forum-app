import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import Nav from '../components/Nav/Nav';
import LandingPage from '../components/LandingPage/LandingPage';
import SingUp from '../components/SignUp/SignUp';
import LogIn from '../components/LogIn/LogIn';
import HomePage from '../components/HomePage/HomePage';
import NewPosts from '../components/NewPost/NewPost';
import Events from '../components/Events/Events';
import EventPage from '../components/EventPage/EventPage';
import Forum from '../components/Forum/Forum';
import ForumContext from '../ForumContext';
import Directory from '../components/Directory/Directory';
import Jobs from '../components/Jobs/Jobs';
export default class Router extends Component {
	render() {
		return (
			<>
				<Nav />
				<ForumContext.Consumer>
					{context => (
						<Switch>
							<Route path='/' component={LandingPage} exact />
							<Route path='/signup' component={SingUp} exact />
							<Route path='/login' component={LogIn} exact />
							<Route path='/new-post' component={NewPosts} exact />
							<Route path='/messageBoard' component={Forum} exact />
							<Route path='/events' component={Events} exact />
							<Route
								path='/events/:eventId'
								render={matchProps => (
									<EventPage events={context.events} {...matchProps} />
								)}
								exact
							/>
							<Route path='/directory' component={Directory} exact />
							<Route path='/jobs' component={Jobs} exact />
							<PrivateRoute path='/homePage' component={HomePage} exact />
						</Switch>
					)}
				</ForumContext.Consumer>
			</>
		);
	}
}
