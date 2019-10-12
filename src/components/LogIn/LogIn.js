import React, { Component } from 'react';
import apiServices from '../../services/apiServices';
import TokenServices from '../../services/TokenServices';
import ForumContext from '../../ForumContext';
import './LogIn.css';

export default class LogIn extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loginName: '',
			password: '',
			success: false,
			error: null
		};
	}
	static contextType = ForumContext;
	handleLoginName = e => {
		this.setState({
			loginName: e.target.value
		});
	};
	handlePass = e => {
		this.setState({
			password: e.target.value
		});
	};
	handleSubmit = e => {
		e.preventDefault();
		const { loginName, password } = this.state;
		const whatLogName = loginName.indexOf('@');
		var creds = {};
		if (whatLogName > 0) {
			const email = loginName;
			creds = { email, password };
		} else {
			const user_name = loginName;
			creds = { user_name, password };
		}
		let token;
		apiServices.login(creds).then(data => {
			console.log(data);
			if (data.error) {
				this.setState({
					error: data.error
				});
			} else {
				token = data.authToken;
				TokenServices.saveAuthToken(token);
				this.setState({
					success: true
				});
			}
		});
	};

	setTestUser = () => {
		this.setState({
			loginName: 'testUser@gmail.com',
			password: 'testUser!2'
		});
	};
	render() {
		if (this.state.success) {
			this.props.history.go(-1);
		}
		return (
			<div className='logIn-container'>
				<div className='logIn-content'>
					<h3>Sign In</h3>

					<form onSubmit={this.handleSubmit}>
						<button type='button' onClick={this.setTestUser}>
							Login as Test User
						</button>
						{this.state.error}

						<input
							type='text'
							name='email'
							id='logIn-email'
							placeholder='User Name or Email Address'
							value={this.state.loginName}
							onChange={this.handleLoginName}
							required
						/>

						<input
							type='password'
							name='pass'
							id='logIn-pass'
							placeholder='Password'
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
