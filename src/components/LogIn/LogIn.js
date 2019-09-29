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
	setTestUser = () => {
		this.setState({
			email: 'test@user.com',
			password: 'Test User'
		});
	};
	render() {
		if (this.state.success) {
			return <Redirect to={this.props.history.go(-1)} />;
		}
		return (
			<div className='logIn-container'>
				<div className='logIn-content'>
					<h3>Sign In</h3>
					{this.state.error}
					<form onSubmit={this.handleSubmit}>
						<button type='button' onClick={this.setTestUser}>
							Login as Test User
						</button>
						<label htmlFor='email'>Email Address</label>
						<input
							type='email'
							name='email'
							id='logIn-email'
							value={this.state.email}
							onChange={this.handleEmail}
							required
						/>
						<label htmlFor='pass'>Password</label>
						<input
							type='password'
							name='pass'
							id='logIn-pass'
							value={this.state.password}
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
