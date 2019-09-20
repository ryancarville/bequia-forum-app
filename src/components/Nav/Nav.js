import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TokenServices from '../../services/TokenServices';
import SearchInput from '../SearchInput/SearchInput';
import './Nav.css';
import ForumContext from '../../ForumContext';

class Nav extends Component {
	render() {
		const loggedIn = TokenServices.getAuthToken();
		const siteNav = (
			<div className='siteNav'>
				<ul>
					<li>
						<Link to='/messageBoard'>
							<p>Forum</p>
						</Link>
					</li>
					<li>
						<Link to='/new-post'>
							<p>New Posts</p>
						</Link>
					</li>
					<li>
						<Link to='/events'>
							<p>Events</p>
						</Link>
					</li>
					<li>
						<Link to='/directory'>
							<p>Directory</p>
						</Link>
					</li>
					<li>
						<Link to='/jobs'>
							<p>Jobs</p>
						</Link>
					</li>
					<li>
						<Link to='/rentals'>
							<p>Rentals</p>
						</Link>
					</li>
					<li>
						<Link to='/marketplace'>
							<p>Market Place</p>
						</Link>
					</li>
					<SearchInput />
				</ul>
			</div>
		);
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
				{siteNav}
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
								<Link to='/homePage'>
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
				{siteNav}
			</>
		);
		const navBar = loggedIn ? privateNav : publicNav;
		return <nav>{navBar}</nav>;
	}
}

export default withRouter(Nav);
