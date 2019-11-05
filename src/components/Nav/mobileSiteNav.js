import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CreateContentButton from '../CreateContentButton/CreateContentButton';
import TokenServices from '../../services/TokenServices';
export default class MobileNav extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false
		};
	}
	openHamburger = () => {
		this.setState({
			isOpen: !this.state.isOpen
		});
	};
	render() {
		const mobileSiteNav = (
			<section className='mobile-nav-container'>
				<div
					className='mobile-site-hamburger'
					id='mobile-hamburger'
					onClick={this.openHamburger}>
					<h3>{this.state.isOpen ? 'X' : <i className='fas fa-bars'></i>}</h3>
				</div>
				<div
					className={` ${
						this.state.isOpen
							? 'mobile-site-nav-open'
							: 'mobile-site-nav-closed'
					}`}>
					<ul>
						<li onClick={this.openHamburger}>
							<Link to='/messageBoard'>
								<p>Forum</p>
							</Link>
						</li>
						<li onClick={this.openHamburger}>
							<Link to='/new-post'>
								<p>New Posts</p>
							</Link>
						</li>
						<li onClick={this.openHamburger}>
							<Link to='/events'>
								<p>Events</p>
							</Link>
						</li>
						<li onClick={this.openHamburger}>
							<Link to='/directory'>
								<p>Directory</p>
							</Link>
						</li>
						<li onClick={this.openHamburger}>
							<Link to={'/jobs'}>
								<p>Jobs</p>
							</Link>
						</li>
						<li onClick={this.openHamburger}>
							<Link to={'/rentals'}>
								<p>Rentals</p>
							</Link>
						</li>
						<li onClick={this.openHamburger}>
							<Link to={'/marketPlace'}>
								<p>Market Place</p>
							</Link>
						</li>
						<li onClick={this.openHamburger}>
							{TokenServices.getAuthToken() ? (
								<CreateContentButton page='forum' />
							) : null}
						</li>
					</ul>
				</div>
			</section>
		);
		return mobileSiteNav;
	}
}
