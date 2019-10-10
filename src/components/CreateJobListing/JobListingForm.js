import React, { useContext } from 'react';
import ForumContext from '../../ForumContext';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import './JobListingForm.css';

export default function JobListingForm(props) {
	const context = useContext(ForumContext);
	const makeCatagoryMenu = () => {
		return context.state.jobCatagories.map(j => {
			return (
				<option key={j.id} value={j.id}>
					{j.name}
				</option>
			);
		});
	};
	return (
		<form className='job-listing-form' onSubmit={props.handleSubmit}>
			<select
				name='jobCatagory'
				id='job-listing-catagory'
				value={props.state.job_cat}
				onChange={props.handleJobCatagory}
				required>
				<option selected disabled value=''>
					Please Select a Job Catagory
				</option>
				{makeCatagoryMenu()}
			</select>
			<select
				name='emploment-type'
				id='job-listing-employment-type'
				value={props.state.employment}
				onChange={props.handleEmploymentType}>
				<option selected disabled value=''>
					Employment Type
				</option>
				<option value='Full Time'>Full Time</option>
				<option value='Part Time'>Part Time</option>
				<option value='Contract'>Contract</option>
				<option value='Seasonal'>Seasonl</option>
			</select>
			<input
				type='text'
				name='title'
				id='job-listing-title'
				value={props.state.title}
				placeholder='Job Title'
				onChange={props.handleTitle}
				required
			/>
			<input
				type='text'
				name='location'
				id='job-listing-location'
				value={props.state.location}
				placeholder='Location'
				onChange={props.handleLocation}
				required
			/>
			<textarea
				name='description'
				id='job-listing-description'
				value={props.state.description}
				placeholder='Job Description'
				onChange={props.handleDescription}
				required></textarea>
			<input
				type='text'
				name='contact-name'
				id='job-listing-contact-name'
				value={props.state.contact_name}
				placeholder='Contact Name'
				onChange={props.handleContactName}
				required
			/>
			<input
				type='email'
				name='contact-email'
				id='job-listing-contact-email'
				value={props.state.contact_email}
				placeholder='Contact Email Address'
				onChange={props.handleContactEmail}
				required
			/>
			<input
				type='text'
				name='website'
				id='job-listing-website'
				value={props.state.website}
				placeholder='Website'
				onChange={props.handleWebsite}
			/>
			<PhoneInput
				type='tel'
				placeholder='Contact Phone Number'
				country='VC'
				id='job-phone-input'
				value={props.state.contact_phone}
				onChange={value => props.handleContactPhone(value)}
			/>
			{props.type === 'edit' ? (
				<button type='submit'>Save Edits</button>
			) : (
				<button type='submit'>Preview Listing</button>
			)}
			<button onClick={props.resetState}>Clear Form</button>
			{props.type === 'edit' ? (
				<button onClick={props.showEditPopUp}>Cancel</button>
			) : (
				<button onClick={() => props.goBack()}>Cancel</button>
			)}
		</form>
	);
}
