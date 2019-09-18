import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import TokenServices from '../../services/TokenServices.js';
import './LogIn.css';

export default class LogIn extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			success: false,
			error: null
		};
	}
	handleEmail = e => {
		this.setState(
			{
				email: e.target.value
			},
			console.log(this.state.email)
		);
	};
	handlePass = e => {
		this.setState({
			password: e.target.value
		});
	};
	handleSubmit = e => {
		e.preventDefault();
		TokenServices.saveAuthToken(this.state.email);
		this.setState({
			success: true
		});
	};
	render() {
		if (this.state.success) {
			return <Redirect to='/homePage' />;
		}
		return (
			<div className='logIn-page'>
				<div className='logIn-container'>
					<h3>Sign In</h3>
					{this.state.error}
					<form onSubmit={this.handleSubmit}>
						<label htmlFor='email'>Email Address</label>
						<input
							type='email'
							name='email'
							id='logIn-email'
							onChange={this.handleEmail}
							required
						/>
						<label htmlFor='pass'>Password</label>
						<input
							type='password'
							name='pass'
							id='logIn-pass'
							onChange={this.handlePass}
							required
						/>
						<button type='submit'>Log In</button>
						<button type='reset'>Clear Form</button>
					</form>
				</div>
			</div>
		);
	}
}
