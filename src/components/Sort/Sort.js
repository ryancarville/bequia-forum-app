import React, { Component } from 'react';
import './Sort.css';

export default class Sort extends Component {
	selectSort = () => {
		if (this.props.sortType === 'dir') {
			return (
				<form className='sortForm' onChange={this.props.handleSort}>
					<label htmlFor='sort'>Sort: </label>
					<select name='sort' id='selectSort'>
						<option value='all-dir'>All</option>
						<option value='asc-dir'>A-Z</option>
						<option value='dec-dir'>Z-A</option>
					</select>
				</form>
			);
		} else if (this.props.sortType === 'posts') {
			return (
				<form className='sortForm' onChange={this.props.handleSort}>
					<label htmlFor='sort'>Sort: </label>
					<select name='sort' id='selectSort'>
						<option value='all-posts'>All</option>
						<option value='newest-posts'>Newest</option>
						<option value='oldest-posts'>Oldest</option>
						<option value='likes-asc-posts'>Most Likes</option>
						<option value='likes-dec-posts'>Least Likes</option>
					</select>
				</form>
			);
		} else if (this.props.sortType === 'rentals') {
			return (
				<form className='sortForm' onChange={this.props.handleSort}>
					<label htmlFor='sort'>Sort: </label>
					<select name='sort' id='selectSort'>
						<option value='all-rent'>All</option>
						<option value='newest-rent'>Newest</option>
						<option value='oldest-rent'>Oldest</option>
						<optgroup label='Catagories'>
							<option value='housing-rent'>Housing</option>
							<option value='marine-rent'>Marine</option>
						</optgroup>
					</select>
				</form>
			);
		} else if (this.props.sortType === 'jobs') {
			return (
				<form className='sortForm' onChange={this.props.handleSort}>
					<label htmlFor='sort'>Sort: </label>
					<select name='sort' id='selectSort'>
						<option value='all-jobs'>All</option>
						<option value='newest-jobs'>Newest</option>
						<option value='oldest-jobs'>Oldest</option>
						<optgroup label='Catagories'>
							<option value='service-jobs'>Service</option>
							<option value='marine-jobs'>Marine</option>
						</optgroup>
					</select>
				</form>
			);
		}
	};
	render() {
		return this.selectSort();
	}
}
