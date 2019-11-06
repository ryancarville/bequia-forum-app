import React from 'react';
import './advertise.css';

export default function advertise(props) {
	return (
		<section className='advertise-container'>
			<header>
				<h3>Advertise With Us</h3>
			</header>
			<p>
				Would you like to adversite your buisness, property or products with us?{' '}
				<br /> <br /> If so, send us an email at <br />{' '}
				<a href='mailto: advertise@bequiaforum.com?subject=New Advertising Enquire'>
					advertise@bequiaforum.com
				</a>
			</p>
		</section>
	);
}
