import React, { useContext } from 'react';
import './ShowJobListingPreview.css';
import { formatPhoneNumberIntl } from 'react-phone-number-input';
import formatDate from '../../helpers/formatDate';
import ForumContext from '../../ForumContext';

export default function ShowJobListingPreview(props) {
	const context = useContext(ForumContext);
	const jobcat = context.state.jobCatagories.filter(
		cat => cat.id === parseInt(props.state.jobcat)
	);
	console.log(jobcat);
	return (
		<div className='job-listing-preview'>
			<h2>Posting in {jobcat[0].name}</h2>
			<h3>{props.state.title}</h3>
			<p>Employment Type: {props.state.employment}</p>

			<p>Where: {props.state.location}</p>
			<h4>Job Description</h4>
			<p>{props.state.description}</p>
			<span>
				<h4>Contact Information</h4>
				<p>{props.state.contactname}</p>
				<a
					href={`mailto: ${props.state.contactemail}?subject=New Enquiry from you post on Bequia Forum: ${props.state.title}`}>
					{props.state.contactemail}
				</a>
				{props.state.contactphone ? (
					<p>Phone: {formatPhoneNumberIntl(props.state.contactphone)}</p>
				) : null}
				{props.state.website ? (
					<a href={props.state.website} target='_blank'>
						{props.state.website}
					</a>
				) : null}
			</span>
			<p>Posted on: {formatDate(props.state.dateposted)}</p>
			<button onClick={() => props.handleSubmit()}>Create Listing</button>
			<button onClick={props.handleShowPreview}>Edit</button>
			<button onClick={() => props.goBack()}>Cancel</button>
		</div>
	);
}
