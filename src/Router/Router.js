import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import Nav from '../components/Nav/Nav';
import LandingPage from '../components/LandingPage/LandingPage';
import SingUp from '../components/SignUp/SignUp';
import LogIn from '../components/LogIn/LogIn';
import HomePage from '../components/HomePage/HomePage';
import NewPosts from '../components/NewPost/NewPost';
import Calendar from '../components/Calendar/Calendar';
import Events from '../components/Events/Events';
export default class Router extends Component {
	render() {
		return (
			<>
				<Nav />
				<Switch>
					<Route path='/' component={LandingPage} exact />
					<Route path='/signup' component={SingUp} exact />
					<Route path='/login' component={LogIn} exact />
					<Route path='/newPosts' component={NewPosts} exact />
					<Route path='/events' component={Events} exact />
					<Route path='/new-post' component={NewPosts} exact />
					<PrivateRoute path='/homePage' component={HomePage} exact />
				</Switch>
			</>
		);
	}
}
