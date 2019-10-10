import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import ShowMarketPlaceListingPreview from './ShowMarketPlaceListingPreview';
import MarketPlaceListingForm from './MarketPlaceListingForm';
import './CreateMarketPlaceListing.css';
import ForumContext from '../../ForumContext';

export default class CreateMarketPlaceListing extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userId: '',
			marketplacecat: '',
			title: '',
			description: '',
			price: '',
			location: '',
			contactname: '',
			contactemail: '',
			contactphone: '',
			dateposted: new Date().toISOString().slice(0, 10),
			showPreview: false,
			success: false
		};
	}
	static contextType = ForumContext;
	resetState = () => {
		this.setState({
			userId: '',
			marketplacecat: '',
			title: '',
			description: '',
			price: '',
			location: '',
			contactname: '',
			contactemail: '',
			contactphone: ''
		});
	};
	handleMarketPlaceCat = e => {
		this.setState({
			marketplacecat: e.target.value
		});
	};
	handleTitle = e => {
		this.setState({
			title: e.target.value
		});
	};
	handleDescription = e => {
		this.setState({
			description: e.target.value
		});
	};
	handleLocation = e => {
		this.setState({
			location: e.target.value
		});
	};
	handlePrice = e => {
		this.setState({
			price: e.target.value
		});
	};
	handleContactName = e => {
		this.setState({
			contactname: e.target.value
		});
	};
	handleContactEmail = e => {
		this.setState({
			contactemail: e.target.value
		});
	};
	handleContactPhone = e => {
		this.setState({
			contactphone: e
		});
	};
	handleShowPreview = e => {
		e.preventDefault();
		this.setState({
			showPreview: !this.state.showPreview
		});
	};
	handleSubmit = e => {
		e.preventDefault();
		const {
			userid,
			marketplacecat,
			title,
			description,
			price,
			location,
			contactname,
			contactemail,
			contactphone,
			dateposted
		} = this.state;
		const newListing = {
			userid,
			marketplacecat,
			title,
			description,
			price,
			location,
			contactname,
			contactemail,
			contactphone,
			dateposted
		};
		this.context.createMarketPlaceListing(newListing);
		this.setState({
			success: true
		});
	};
	goBack = () => {
		this.props.history.goBack();
	};
	componentDidMount() {
		this.setState({
			userid: this.context.user.id
		});
	}

	render() {
		if (this.state.success) {
			const id = this.state.marketplacecat;
			return <Redirect to={`/marketPlace/${id}`} />;
		}
		return (
			<section className='create-mp-listing-container'>
				<div className='create-job-lisitng-content'>
					{this.state.showPreview ? (
						<ShowMarketPlaceListingPreview
							state={this.state}
							handleShowPreview={this.handleShowPreview}
							handleSubmit={this.handleSubmit}
							goBack={this.goBack}
						/>
					) : (
						<MarketPlaceListingForm
							state={this.state}
							handleMarketPlaceCat={this.handleMarketPlaceCat}
							handleTitle={this.handleTitle}
							handleLocation={this.handleLocation}
							handleDescription={this.handleDescription}
							handlePrice={this.handlePrice}
							handleContactName={this.handleContactName}
							handleContactEmail={this.handleContactEmail}
							handleContactPhone={this.handleContactPhone}
							handleShowPreview={this.handleShowPreview}
							resetState={this.resetState}
							goBack={this.goBack}
						/>
					)}
				</div>
			</section>
		);
	}
}
