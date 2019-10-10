import React, { useContext } from 'react';
import STORE from '../../STORE/store';
import PhoneInput from 'react-phone-number-input';
import './RentalForm.css';
import 'react-phone-number-input/style.css';
import ForumContext from '../../ForumContext';

export default function RentalForm(props) {
	const context = useContext(ForumContext);
	var hideAirBnbLable = '';
	var hideHomeAwayLable = '';
	var hideBooking_comLable = '';
	var hideOtherLable = '';
	if (props.state.showAirbnb) {
		hideAirBnbLable += ' hide-lable';
	}
	if (props.state.showHomeAway) {
		hideHomeAwayLable += ' hide-lable';
	}
	if (props.state.showBooking_com) {
		hideBooking_comLable += ' hide-lable';
	}
	if (props.state.showOther) {
		hideOtherLable += ' hide-lable';
	}
	const makeRentalTypes = () => {
		return context.state.rentalCatagories.map(r => (
			<option value={r.id}>{r.name}</option>
		));
	};
	const listingForm = (
		<form className='rental-listing-form' onSubmit={props.handleShowPreview}>
			<select
				name='rental-type'
				id='rental-lisitng-form-rental-type'
				value={props.state.rentalcat}
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
			<input
				type='text'
				name='location'
				id='rental-listing-form-location'
				value={props.state.location}
				placeholder='Location'
				onChange={props.handleLocation}
				required
			/>
			<input
				type='text'
				name='price'
				id='rental-listing-form-price'
				value={props.state.price}
				placeholder='Price'
				onChange={props.handlePrice}
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
				value={props.state.contactname}
				placeholder='Contact Name'
				onChange={props.handleContactName}
				required
			/>
			<input
				type='email'
				name='contact-email'
				id='rental-lisitng-form-contact-email'
				value={props.state.contactemail}
				placeholder='Contact Email Address'
				onChange={props.handleContactEmail}
				required
			/>
			<PhoneInput
				name='contact-phone'
				id='rental-lisitng-form-contact-phone'
				placeholder='Contact Phone Number'
				country='VC'
				value={props.state.contactphone}
				onChange={value => props.handleContactPhone(value)}
				autoComplete
			/>
			<span>
				<input
					className='booking-site-checkbox'
					type='checkbox'
					name='airbnb-site'
					id='rental-lisitng-form-airbnb'
					value={props.state.showAirbnb}
					onChange={props.handleShowAirBnbSiteInput}
				/>
				{props.state.showAirbnb ? (
					<input
						className='booking-site-input'
						type='url'
						value={props.state.airbnb}
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
					value={props.state.showHomeAway}
					onChange={props.handleShowHomeAwaySiteInput}
				/>
				{props.state.showHomeAway ? (
					<input
						className='booking-site-input'
						type='url'
						value={props.state.homeaway}
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
					value={props.state.showBooking_com}
					onChange={props.handleShowBookingSiteInput}
				/>
				{props.state.showBooking_com ? (
					<input
						className='booking-site-input'
						type='url'
						value={props.state.bookingdotcom}
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
					value={props.state.showOther}
					onChange={props.handleShowOtherSiteInput}
				/>
				{props.state.showOther ? (
					<input
						className='booking-site-input'
						type='url'
						value={props.state.othersite}
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
	return listingForm;
}
