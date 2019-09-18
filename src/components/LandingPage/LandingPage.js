import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

export default function LandingPage() {
	return (
		<div className='landingPage-container'>
			<h1>Welcome to Bequia Forum!</h1>
			<h4>A place to connect with locals, travelers and the world.</h4>
			<p>
				You will find events calenders, message boards on a number of topics and
				job listings.
				<br /> <Link to='/signup'>Create an account</Link> today to get the most
				out fo the platform.
			</p>
			<img
				src='https://secure.i.telegraph.co.uk/multimedia/archive/01862/Bequia620_1862243b.jpg'
				alt='bequia-isalnd'
			/>
		</div>
	);
}
