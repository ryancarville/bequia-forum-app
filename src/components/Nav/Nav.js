import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TokenServices from '../../services/TokenServices';
import './Nav.css';
import MobileSiteNav from './mobileSiteNav';
import DesktopSiteNav from './desktopSiteNav';

class Nav extends Component {
	render() {
		const loggedIn = TokenServices.getAuthToken();
		const publicNav = (
			<>
				<div className='navBar'>
					<span className='forumLogo'>
						<Link to='/'>
							<img src='../../../icons/bequia-logo.png' alt='forum-icon' />
						</Link>
						<h1>Bequia Forum</h1>
					</span>
					<DesktopSiteNav />
					<div className='rightNavInfo'>
						<Link to='/signup'>
							<i className='fas fa-user-plus' samesite='none'></i>
						</Link>

						<Link to='/login'>
							<i className='fas fa-sign-in-alt' samesite='none'></i>
						</Link>
					</div>
				</div>

				<MobileSiteNav />
			</>
		);
		const privateNav = (
			<>
				<div className='navBar'>
					<span className='forumLogo'>
						<Link to='/'>
							<img src='../../../icons/bequia-logo.png' alt='forum-icon' />
						</Link>
						<Link to='/'>
							<h1>Bequia Forum</h1>
						</Link>
					</span>
					<DesktopSiteNav />
					<div className='rightNavInfo'>
						<Link to='/dashboard'>
							<i className='fas fa-tachometer-alt' samesite='none'></i>
						</Link>
						<Link to='/' onClick={() => TokenServices.clearAuthToken()}>
							<i className='fas fa-sign-out-alt' samesite='none'></i>
						</Link>
					</div>
				</div>
				<MobileSiteNav />
			</>
		);
		const navBar = loggedIn ? privateNav : publicNav;
		return <nav>{navBar}</nav>;
	}
}

export default Nav;
