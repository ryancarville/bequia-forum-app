import React from 'react';
import { Link } from 'react-router-dom';
import './support.css';

export default function support(props) {
	return (
		<section className='support-container'>
			<div>
				<h2>Support Page</h2>
				<p>
					Please check the <Link to={'/messageBoard/9'}>Support</Link> messageboard for
					FAQ's. Should you not find what you are looking for there you can
					email us at{' '}
					<a href='mailto: support@bequiaforum.com?subjust=New Support Ticket'>
						support@bequiaforum.com
					</a>
				</p>
			</div>
		</section>
	);
}
