import React from 'react';
import { formatPhoneNumberIntl } from 'react-phone-number-input';
import './JobPage.css';

export default function JobPage(props) {
	const j = props.location.state.job;
	return (
		<section className='job-page-container'>
			<div className='job-page-content'>
				<h3>{j.title}</h3>
				<p>{j.employment}</p>
				<h4>Where</h4>
				<p>{j.location}</p>
				<h4>Job Description</h4>
				<p>{j.description}</p>
				<span>
					<h4>Contact Information</h4>
					<p>{j.contact.name}</p>
					<a
						href={`mailto: ${j.contact.email}?subject=New Enquiry from you post on Bequia Forum: ${j.title}`}>
						{j.contact.email}
					</a>
					<p>Phone: {formatPhoneNumberIntl(j.contact.phone)}</p>
				</span>
			</div>
		</section>
	);
}
