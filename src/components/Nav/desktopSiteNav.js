import React from 'react';
import { Link } from 'react-router-dom';
import SearchInput from '../SearchInput/SearchInput';

const desktopSiteNav = (
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
				<Link
					to={{
						pathname: '/messageBoard/28',
						state: {
							forum: {
								title: 'Jobs'
							}
						}
					}}>
					<p>Jobs</p>
				</Link>
			</li>
			<li>
				<Link
					to={{
						pathname: '/messageBoard/29',
						state: {
							forum: {
								title: 'Rentals'
							}
						}
					}}>
					<p>Rentals</p>
				</Link>
			</li>
			<li>
				<Link
					to={{
						pathname: '/messageBoard/27',
						state: {
							forum: {
								title: 'Market Place'
							}
						}
					}}>
					<p>Market Place</p>
				</Link>
			</li>
			<SearchInput />
		</ul>
	</div>
);
export default desktopSiteNav;
