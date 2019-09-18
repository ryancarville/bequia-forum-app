import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TokenServices from '../../services/TokenServices';
import SearchInput from '../SearchInput/SearchInput';
import './Nav.css';

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
						<div>
							<li>
								<Link to='/signup'>Sign Up</Link>
							</li>
							<li>
								<Link to='/login'>Log in</Link>
							</li>
						</div>
					</ul>
				</div>
				<div className='siteNav'>
					<ul>
						<li>
							<Link to='/messageBoard'>Forum</Link>
						</li>
						<li>
							<Link to='/new-post'>New Posts</Link>
						</li>
						<li>
							<Link to='/events'>Events</Link>
						</li>
						<li>
							<Link to='/directory'>Directory</Link>
						</li>
						<li>
							<Link to='/jobs'>Jobs</Link>
						</li>
						<li>
							<Link to='/rentals'>Rentals</Link>
						</li>
						<SearchInput />
					</ul>
				</div>
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
						<div>
							<li>
								<Link to='/homePage'>Dashboard</Link>
							</li>
							<li>
								<Link to='/' onClick={() => TokenServices.clearAuthToken()}>
									Log Out
								</Link>
							</li>
						</div>
					</ul>
				</div>
				<div className='siteNav'>
					<ul>
						<li>
							<Link to='/messageBoard'>Forum</Link>
						</li>
						<li>
							<Link to='/new-post'>New Posts</Link>
						</li>
						<li>
							<Link to='/events'>Events</Link>
						</li>
						<li>
							<Link to='/directory'>Directory</Link>
						</li>
						<li>
							<Link to='/jobs'>Jobs</Link>
						</li>
						<li>
							<Link to='/rentals'>Rentals</Link>
						</li>
						<SearchInput />
					</ul>
				</div>
			</>
		);
		const navBar = loggedIn ? privateNav : publicNav;
		return <nav>{navBar}</nav>;
	}
}

export default withRouter(Nav);
