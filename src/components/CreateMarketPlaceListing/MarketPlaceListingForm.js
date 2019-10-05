import React, { useContext } from 'react';
import './MarketPlaceListingForm.css';
import PhoneInput from 'react-phone-number-input';
import ForumContext from '../../ForumContext';
export default function MarketPlaceListingForm(props) {
	const context = useContext(ForumContext);
	const makeSelectMenu = context.state.marketPlace.map(mp => (
		<option key={mp.id} value={mp.id}>
			{mp.title}
		</option>
	));
	return (
		<form className='mp-listing-form' onSubmit={props.handleShowPreview}>
			<select
				name='mp-catagories'
				id='mp-lisitng-catagories'
				value={props.state.marketPlaceId}
				onChange={props.handleMarketPlaceCat}
				required>
				<option selected disabled value=''>
					Please select a Market Place
				</option>
				{makeSelectMenu}
			</select>
			<input
				type='text'
				name='title'
				id='mp-listing-title'
				value={props.state.title}
				placeholder='Listing Title'
				onChange={props.handleTitle}
				required
			/>
			<textarea
				name='item-description'
				id='mp-listing-description'
				value={props.state.description}
				placeholder='Enter description here...'
				onChange={props.handleDescription}
				required
			/>
			<input
				type='text'
				name='price'
				id='mp-listing-price'
				value={props.state.price}
				placeholder='Price'
				onChange={props.handlePrice}
			/>
			<input
				type='text'
				name='location'
				id='mp-listing-location'
				value={props.state.location}
				placeholder='Where is the item located?'
				onChange={props.handleLocation}
			/>
			<input
				type='text'
				name='contact-name'
				id='mp-listing-contct-name'
				value={props.state.contact.name}
				placeholder='Contact Name'
				onChange={props.handleContactName}
				required
			/>
			<input
				type='email'
				name='contact-email'
				id='mp-listing-contact-email'
				value={props.state.contact.email}
				placeholder='Contact Email Address'
				onChange={props.handleContactEmail}
				required
			/>
			<PhoneInput
				type='tel'
				placeholder='Contact Phone Number'
				country='VC'
				value={props.state.contact.phone}
				onChange={value => props.handleContactPhone(value)}
			/>
			<button type='submit'>Preview Listing</button>
			<button onClick={props.resetState}>Clear Form</button>
			<button onClick={props.goBack}>Cancel</button>
		</form>
	);
}
