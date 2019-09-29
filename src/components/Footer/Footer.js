import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
	return (
		<section className='footer-container'>
			<div className='footer-content'>
				<Link to={'/about'}>About Us</Link>
				<Link to={'/help'}>Support</Link>
				<Link to={'/contact'}>Contact Us</Link>
				<Link to={'/donate'}>Donate</Link>
				<Link to={'/advertising'}>Advertise with us</Link>
			</div>
			<br />
			<p>All Rights Reserved ©2019 Bequia Forum</p>
		</section>
	);
}
