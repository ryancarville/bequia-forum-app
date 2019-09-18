import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import Nav from '../components/Nav/Nav';
import LandingPage from '../components/LandingPage/LandingPage';
import SingUp from '../components/SignUp/SignUp';
import LogIn from '../components/LogIn/LogIn';
import HomePage from '../components/HomePage/HomePage';
export default class Router extends Component {
	render() {
		return (
			<>
				<Nav />
				<Switch>
					<Route path='/' component={LandingPage} exact />
					<Route path='/signup' component={SingUp} exact />
					<Route path='/login' component={LogIn} exact />
					<PrivateRoute path='/homePage' component={HomePage} exact />
				</Switch>
			</>
		);
	}
}
