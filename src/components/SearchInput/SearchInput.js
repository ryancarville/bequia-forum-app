import React, { Component } from 'react';
import './SearchInput.css';

export default class SearchInput extends Component {
	constructor(props) {
		super(props);
		this.state = {
			keyword: ''
		};
	}
	handleKeyword = e => {
		this.setState({
			keyword: e.target.value
		});
	};
	handleSearch = e => {
		e.preventDefault();
	};
	render() {
		return (
			<form onSubmit={this.handleSearch}>
				<input type='search' name='search' onChange={this.handleKeyword} />
				<button type='submit'>Search</button>
			</form>
		);
	}
}
