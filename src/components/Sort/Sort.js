import React, { Component } from 'react';
import './Sort.css';
import apiServices from '../../services/apiServices';
import ForumContext from '../../ForumContext';

export default class Sort extends Component {
	constructor(props) {
		super(props);
		this.state = {
			table: '',
			column: '',
			sortType: ''
		};
	}
	handleSort = context => {
		setTimeout(() => {
			const { column, sortType } = this.state;
			const sort = { column, sortType };
			if (this.state.table === 'dir') {
				apiServices
					.sortDirectory(sort)
					.then(data => context.setDirectoryState(data));
			}
			if (this.state.table === 'jobs') {
				apiServices.sortJobs(sort).then(data => context.setJobsState(data));
			}
			if (this.state.table === 'rentals') {
				apiServices
					.sortRentals(sort)
					.then(data => context.setRentalsState(data));
			}
			if (this.state.table === 'marketPlace') {
				apiServices
					.sortMarketPlace(sort)
					.then(data => context.setMarketPlaceState(data));
			}
			if (this.state.table === 'posts') {
				apiServices
					.sortForumPosts(sort)
					.then(data => context.setForumPostsState(data));
			}
			return;
		}, 50);
	};
	handleSortType = e => {
		const sortTypes = e.target.value.split('-');
		this.setState({
			sortType: sortTypes[0],
			column: sortTypes[1]
		});
	};
	selectSort = () => {
		if (this.state.table === 'dir') {
			return (
				<ForumContext.Consumer>
					{context => (
						<form
							className='sortForm'
							onChange={() => this.handleSort(context)}>
							<select
								name='sort'
								id='selectSort'
								onChange={this.handleSortType}>
								<option selected disabled value=''>
									Sort By...
								</option>
								<option value='asc-last_name'>Last Name A-Z</option>
								<option value='desc-last_name'>Last NameZ-A</option>
								<option value='asc-first_name'>First Name A-Z</option>
								<option value='desc-first_name'>First Name Z-A</option>
								<option value='asc-city'>City A-Z</option>
								<option value='desc-city'>City Z-A</option>
								<option value='asc-country'>Country A-Z</option>
								<option value='desc-country'>Country Z-A</option>
							</select>
						</form>
					)}
				</ForumContext.Consumer>
			);
		} else if (this.props.sortType === 'marketPlace') {
			return (
				<ForumContext.Consumer>
					{context => (
						<form
							className='sortForm'
							onChange={() => this.handleSort(context)}>
							<select
								name='sort'
								id='selectSort'
								onChange={this.handleSortType}>
								<option selected disabled value=''>
									Sort By...
								</option>
								<option value='desc-date_posted'>Date Posted new-old</option>
								<option value='asc-date_posted'>Date Posted old-new</option>
								<option value='asc-price'>Price low-high</option>
								<option value='desc-price'>Price high-low</option>
								<option value='asc-location'>Location A-Z</option>
								<option value='desc-location'>Location Z-A</option>
							</select>
						</form>
					)}
				</ForumContext.Consumer>
			);
		} else if (this.props.sortType === 'rentals') {
			return (
				<ForumContext.Consumer>
					{context => (
						<form
							className='sortForm'
							onChange={() => this.handleSort(context)}>
							<select
								name='sort'
								id='selectSort'
								onChange={this.handleSortType}>
								<option selected disabled value=''>
									Sort By...
								</option>
								<option value='asc-title'>Title A-Z</option>
								<option value='desc-title'>Title Z-A</option>
								<option value='asc-price'>Price low-high</option>
								<option value='desc-price'>Price high-low</option>
								<option value='asc-location'>Location A-Z</option>
								<option value='desc-location'>Location Z-A</option>
								<option value='asc-date_posted'>Date Posted old-new</option>
								<option value='desc-date_posted'>Date Posted new-old</option>
							</select>
						</form>
					)}
				</ForumContext.Consumer>
			);
		} else if (this.props.sortType === 'jobs') {
			return (
				<ForumContext.Consumer>
					{context => (
						<form
							className='sortForm'
							onChange={() => this.handleSort(context)}>
							<select
								name='sort'
								id='selectSort'
								onChange={this.handleSortType}>
								<option selected disabled value=''>
									Sort By...
								</option>
								<option value='asc-title'>Title A-Z</option>
								<option value='desc-title'>Title Z-A</option>
								<option value='asc-location'>Location A-Z</option>
								<option value='desc-location'>Location Z-A</option>
								<option value='Full Time-employment'>Full Time</option>
								<option value='Part Time-employment'>Part Time</option>
								<option value='Contract-employment'>Contract</option>
								<option value='Seasonal-employment'>Seasonal</option>
							</select>
						</form>
					)}
				</ForumContext.Consumer>
			);
		} else if (this.props.sortType === 'posts') {
			return (
				<ForumContext.Consumer>
					{context => (
						<form
							className='sortForm'
							onChange={() => this.handleSort(context)}>
							<select
								name='sort'
								id='selectSort'
								onChange={this.handleSortType}>
								<option selected disabled value=''>
									Sort By...
								</option>
								<option value='asc-title'>Title A-Z</option>
								<option value='desc-title'>Title Z-A</option>
								<option value='asc-date_posted'>Date Posted old-new</option>
								<option value='desc-date_posted'>Date Posted new-old</option>
								<option value='asc-likes'>Likes low-high</option>
								<option value='desc-likes'>Likes high-low</option>
							</select>
						</form>
					)}
				</ForumContext.Consumer>
			);
		}
	};
	setTable = () => {
		this.setState({
			table: this.props.sortType
		});
		return true;
	};

	render() {
		return this.state.table ? this.selectSort() : this.setTable();
	}
}
