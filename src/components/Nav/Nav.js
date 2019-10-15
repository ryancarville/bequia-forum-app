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
					<ul>
						<li className='forumLogo'>
							<Link to='/'>
								<img
									src='https://external-preview.redd.it/3x6-YygZ-f7z0r1EBBNr4pbgdmUF9EBvlblgDKoTNf4.png?auto=webp&s=9db73ead41cc12914a4a4bf825217ea08037ad2d'
									alt='forum-icon'
								/>
							</Link>
						</li>
						<h1>Bequia Forum</h1>
						<div>
							<li>
								<Link to='/signup'>
									<p>Sign Up</p>
								</Link>
							</li>
							<li>
								<Link to='/login'>
									<p>Log in</p>
								</Link>
							</li>
						</div>
					</ul>
				</div>

				<MobileSiteNav />
				<DesktopSiteNav />
			</>
		);
		const privateNav = (
			<>
				<div className='navBar'>
					<ul>
						<li className='forumLogo'>
							<Link to='/'>
								<img
									src='https://external-preview.redd.it/3x6-YygZ-f7z0r1EBBNr4pbgdmUF9EBvlblgDKoTNf4.png?auto=webp&s=9db73ead41cc12914a4a4bf825217ea08037ad2d'
									alt='forum-icon'
								/>
							</Link>
						</li>
						<h1>Bequia Forum</h1>
						<div className='rightNavInfo'>
							<ForumContext.Consumer>
								{context => (
									<div className='userInfo'>
										<p>
											Welcome back <br />
											{context.user.name}!
										</p>
									</div>
								)}
							</ForumContext.Consumer>
							<li>
								<Link to='/dashboard'>
									<p>Dashboard</p>
								</Link>
							</li>
							<li>
								<Link to='/' onClick={() => TokenServices.clearAuthToken()}>
									<p>Log Out</p>
								</Link>
							</li>
						</div>
					</ul>
				</div>

				<MobileSiteNav />
				<DesktopSiteNav />
			</>
		);
		const navBar = loggedIn ? privateNav : publicNav;
		return <nav>{navBar}</nav>;
	}
}

export default withRouter(Nav);
