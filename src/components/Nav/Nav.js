import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TokenServices from '../../services/TokenServices';
import './Nav.css';
import ForumContext from '../../ForumContext';
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
							<p>Sign Up</p>
						</Link>

						<Link to='/login'>
							<p>Log in</p>
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
							<i class='fas fa-tachometer-alt'></i>
						</Link>
						<Link to='/' onClick={() => TokenServices.clearAuthToken()}>
							<i class='fas fa-sign-out-alt'></i>
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

export default withRouter(Nav);
