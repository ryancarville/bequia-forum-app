import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './MarketPlacePage.css';
import DeleteButton from '../Buttons/deleteButton';
import DeletePopUp from '../DeletePopUp/DeletePopUp';
import EditButton from '../Buttons/Edit';
import TokenServices from '../../services/TokenServices';
import MarketPlaceListingForm from '../CreateMarketPlaceListing/MarketPlaceListingForm';
import ForumContext from '../../ForumContext';
import ListingBody from './ListingBody';
export default class MarketPlacePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: '',
			userid: '',
			marketplacecat: '',
			title: '',
			description: '',
			price: '',
			location: '',
			contactname: '',
			contactemail: '',
			contactphone: '',
			dateposted: new Date().toISOString(),
			showEditPopUp: false,
			showDeletePopUp: false,
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
		this.context.editMarketPlaceListing(newListing);
		this.setState({
			showEditPopUp: !this.state.showEditPopUp
		});
	};
	showEditPopUp = () => {
		this.setState({
			showEditPopUp: !this.state.showEditPopUp
		});
	};
	showDeletePopUp = () => {
		this.setState({
			showDeletePopUp: !this.state.showDeletePopUp
		});
	};
	handleDelete = () => {
		const { id } = this.state;
		this.context.deleteMarketPlaceListing(id);
		this.setState({
			redirect: true
		});
	};
	componentDidMount() {
		const { id } = this.props.location.state;
		var l = this.context.state.marketPlacePosts.filter(l => l.id === id);
		l = l[0];
		this.setState({
			id: l.id,
			userid: l.userid,
			marketplacecat: l.marketplacecat,
			title: l.title,
			description: l.description,
			price: l.price,
			location: l.location,
			contactname: l.contactname,
			contactemail: l.contactemail,
			contactphone: l.contactphone,
			dateposted: l.dateposted
		});
	}

	render() {
		if (this.state.redirect) {
			return <Redirect to={'/marketPlace'} />;
		}
		return (
			<section className='market-place-page-container'>
				<div className='market-place-page-content'>
					{this.state.showDeletePopUp ? (
						<DeletePopUp
							marketPlaceTitle={this.state.title}
							showDeletePopUp={this.showDeletePopUp}
							handleDelete={this.handleDelete}
						/>
					) : null}
					{this.state.showEditPopUp ? (
						<MarketPlaceListingForm
							type='edit'
							state={this.state}
							handleMarketPlaceCat={this.handleMarketPlaceCat}
							handleTitle={this.handleTitle}
							handleLocation={this.handleLocation}
							handleDescription={this.handleDescription}
							handlePrice={this.handlePrice}
							handleContactName={this.handleContactName}
							handleContactEmail={this.handleContactEmail}
							handleContactPhone={this.handleContactPhone}
							handleShowPreview={this.handleSubmit}
							resetState={this.resetState}
						/>
					) : (
						<ListingBody state={this.state} />
					)}
					{TokenServices.getAuthToken() ? (
						this.state.userid === this.context.user.id ? (
							<DeleteButton showDeletePopUp={this.showDeletePopUp} />
						) : null
					) : null}
					{TokenServices.getAuthToken() ? (
						this.state.userid === this.context.user.id ? (
							<EditButton
								type='marketPlace'
								showEditPopUp={this.showEditPopUp}
							/>
						) : null
					) : null}
				</div>
			</section>
		);
	}
}
