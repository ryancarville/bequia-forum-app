import React from 'react';
import STORE from '../../STORE/store';
import PhoneInput from 'react-phone-number-input';
import './RentalForm.css';
import 'react-phone-number-input/style.css';

export default function RentalForm(props) {
	var hideAirBnbLable = '';
	var hideHomeAwayLable = '';
	var hideBooking_comLable = '';
	var hideOtherLable = '';
	if (props.state.airbnb) {
		hideAirBnbLable += ' hide-lable';
	}
	if (props.state.homeAway) {
		hideHomeAwayLable += ' hide-lable';
	}
	if (props.state.booking_com) {
		hideBooking_comLable += ' hide-lable';
	}
	if (props.state.other) {
		hideOtherLable += ' hide-lable';
	}
	const makeRentalTypes = () => {
		return STORE.rentals.map(r => <option value={r.id}>{r.title}</option>);
	};
	const listingForm = (
		<form className='rental-listing-form' onSubmit={props.handleShowPreview}>
			<select
				name='rental-type'
				id='rental-lisitng-form-rental-type'
				value={props.state.rentalTypeId}
				onChange={props.handleRentalType}
				required>
				<option selected disabled value=''>
					Please select a Rental Type
				</option>
				{makeRentalTypes()}
			</select>
			<input
				type='text'
				name='title'
				id='rental-lisitng-form-title'
				value={props.state.title}
				placeholder='Listing Title'
				onChange={props.handleTitle}
				required
			/>
			<textarea
				name='description'
				id='rental-lisitng-form-description'
				value={props.state.description}
				placeholder='Description'
				onChange={props.handleDescription}
				required
			/>
			<input
				type='text'
				name='contact-name'
				id='rental-lisitng-form-contact-name'
				value={props.state.contact.name}
				placeholder='Contact Name'
				onChange={props.handleContactName}
				required
			/>
			<input
				type='email'
				name='contact-email'
				id='rental-lisitng-form-contact-email'
				value={props.state.contact.email}
				placeholder='Contact Email Address'
				onChange={props.handleContactEmail}
				required
			/>
			<PhoneInput
				name='contact-phone'
				id='rental-lisitng-form-contact-phone'
				placeholder='Contact Phone Number'
				country='VC'
				value={props.state.contact.phone}
				onChange={value => props.handleContactPhone(value)}
				autoComplete
			/>
			<span>
				<input
					className='booking-site-checkbox'
					type='checkbox'
					name='airbnb-site'
					id='rental-lisitng-form-airbnb'
					value={props.state.airbnb}
					onChange={props.handleShowAirBnbSiteInput}
				/>
				{props.state.airbnb ? (
					<input
						className='booking-site-input'
						type='url'
						value={props.state.airbnbSite}
						name='airbnb-site'
						id='rental-lisitng-form-airbnb-site'
						placeholder='Airbnb Website Address'
						onChange={props.handleAirbnb}
					/>
				) : null}
				<label className={hideAirBnbLable} htmlFor='airbnb'>
					AirBnb
				</label>

				<input
					className='booking-site-checkbox'
					type='checkbox'
					name='homeaway'
					id='rental-lisitng-form-homeAway'
					value={props.state.homeAway}
					onChange={props.handleShowHomeAwaySiteInput}
				/>
				{props.state.homeAway ? (
					<input
						className='booking-site-input'
						type='url'
						value={props.state.homeAwaySite}
						name='homeaway-site'
						id='rental-lisitng-form-homeAway-site'
						placeholder='HomeAway Website Address'
						onChange={props.handleHomeAway}
					/>
				) : null}
				<label className={hideHomeAwayLable} htmlFor='homeAway-site'>
					HomeAway
				</label>

				<input
					className='booking-site-checkbox'
					type='checkbox'
					name='booking-com'
					id='rental-lisitng-form-booking-com'
					value={props.state.booking_com}
					onChange={props.handleShowBookingSiteInput}
				/>
				{props.state.booking_com ? (
					<input
						className='booking-site-input'
						type='url'
						value={props.state.booking_comSite}
						name='booking-com-site'
						id='rental-lisitng-form-booking-com-site'
						placeholder='Booking.com Website Address'
						onChange={props.handleBooking_com}
					/>
				) : null}
				<label className={hideBooking_comLable} htmlFor='booking-com-site'>
					Booking.com
				</label>
				<input
					className='booking-site-checkbox'
					type='checkbox'
					name='other-site'
					id='rental-lisitng-form-other-site'
					value={props.state.other}
					onChange={props.handleShowOtherSiteInput}
				/>
				{props.state.other ? (
					<input
						className='booking-site-input'
						type='url'
						value={props.state.otherSite}
						name='other-site'
						id='rental-lisitng-form-other-site'
						placeholder='Website Address'
						onChange={props.handleOtherSite}
					/>
				) : null}
				<label className={hideOtherLable} htmlFor='booking-com-site'>
					Other Site
				</label>
			</span>

			<button type='submit'>Preview Listing</button>
			<button onClick={props.resetState}>Clear Form</button>
			<button onClick={props.goBack}>Cancel</button>
		</form>
	);
	return listingForm;
}