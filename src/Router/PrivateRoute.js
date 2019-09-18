import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import TokenServices from '../services/TokenServices';

export const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			TokenServices.getAuthToken() ? (
				<Component {...props} />
			) : (
				<Redirect to={'/login'} />
			)
		}
	/>
);
