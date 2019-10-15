import React from 'react';
import { Link } from 'react-router-dom';
import SearchInput from '../SearchInput/SearchInput';

function DesktopSiteNav() {
	return (
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
					<Link to={'/jobs'}>
						<p>Jobs</p>
					</Link>
				</li>
				<li>
					<Link to={'/rentals'}>
						<p>Rentals</p>
					</Link>
				</li>
				<li>
					<Link to={'/marketPlace'}>
						<p>Market Place</p>
					</Link>
				</li>
				<li>
					<SearchInput />
				</li>
			</ul>
		</div>
	);
}
export default DesktopSiteNav;
