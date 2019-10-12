import React, { Component } from 'react';

export default class CreateListing extends Component {
	constructor(props) {
		super(props);
		this.state = {
			first_name: '',
			last_name: '',
			address: '',
			city: '',
			country: '',
			email: '',
			phone: '',
			website: ''
		};
	}
	handleFirstName = e => {
		this.setState({
			first_name: e.target.value
		});
	};
	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<input
					type='text'
					name='first_name'
					id='dir-listing-form-first_name'
					placeholder='First Name'
					value={this.state.first_name}
					onChange={this.handleFirstName}
				/>
			</form>
		);
	}
}
