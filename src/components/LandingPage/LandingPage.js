import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

export default function LandingPage() {
	return (
		<div className='landingPage-container'>
			<div className='landingPage-content'>
				<div>
					<h1>Welcome to Bequia Forum!</h1>
					<h4>A place to connect with locals, travelers and the world.</h4>
					<p>
						You will find events calenders, message boards on a number of topics
						and job listings.
						<br /> <Link to='/signup'>Create an account</Link> today to get the
						most out of the platform. i.e. Create Posts, events, comments etc.
					</p>
				</div>
				<img src='../windy-palms.gif' alt='windy-palms' />
			</div>
		</div>
	);
}
