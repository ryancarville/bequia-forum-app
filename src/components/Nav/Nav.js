import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TokenServices from '../../services/TokenServices';
import './Nav.css';

class Nav extends Component {
	render() {
		const publicNav = (
			<ul>
				<li>
					<Link to='/'>Bequia Forum Icon Here</Link>
				</li>
				<div>
					<li>
						<Link to='/signup'>Sign Up</Link>
					</li>
					<li>
						<Link to='/login'>Log in</Link>
					</li>
				</div>
			</ul>
		);
		const privateNav = (
			<div className='navBar'>
				<ul>
					<li>
						<Link to='/' onClick={TokenServices.clearAuthToken()}>
							Log Out
						</Link>
					</li>
				</ul>
			</div>
		);
		const navBar = TokenServices.getAuthToken() ? privateNav : publicNav;
		return <nav className='navBar'>{navBar}</nav>;
	}
}

export default Nav;
