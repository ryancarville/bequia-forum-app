import React, { useContext } from 'react';
import { formatPhoneNumberIntl } from 'react-phone-number-input';
import './ShowMarketPlaceListingPreview.css';
import formatDate from '../../helpers/formatDate';
import ForumContext from '../../ForumContext';
export default function ShowMarketPlaceListingPreview(props) {
	const context = useContext(ForumContext);
	const marketPlaceCat = context.state.marketPlaceCatagories.filter(
		mp => mp.id === parseInt(props.state.marketplacecat)
	);
	return (
		<div className='mp-listing-preview'>
			<h2>Posting in catagory: {marketPlaceCat[0].name}</h2>
			<h3>{props.state.title}</h3>
			<p>Price: ${props.state.price}</p>
			{props.state.location ? (
				<>
					{' '}
					<h4>Location</h4> <p>{props.state.location}</p>
				</>
			) : null}
			<h4>Description</h4>
			<p>{props.state.description}</p>
			<h4>Contact Information</h4>

			<span>
				<p>{props.state.contactname}</p>
				<a
					href={`mailto:${props.state.contactemail}?subject=New Enquiry on ${props.state.title}`}>
					{props.state.contactemail}
				</a>
				<p>Phone: {formatPhoneNumberIntl(props.state.contactphone)}</p>
			</span>
			<p>Posted on: {formatDate(props.state.dateposted)}</p>
			<button onClick={props.handleSubmit}>Create Listing</button>
			<button onClick={props.handleShowPreview}>Edit</button>
			<button onClick={() => props.goBack()}>Cancel</button>
		</div>
	);
}
