import React, { Component } from 'react';
import './SignUp.css';

export default class SingUp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fName: '',
			lName: '',
			email: '',
			pass: '',
			confirmPass: '',
			error: null
		};
	}
	handleFName = e => {
		this.setState({
			fName: e.target.value
		});
	};
	handleLName = e => {
		this.setState({
			lName: e.target.value
		});
	};
	handleEmail = e => {
		this.setState({
			email: e.target.value
		});
	};
	handlePass = e => {
		this.setState({
			pass: e.target.value
		});
	};
	handleConfirmPass = e => {
		this.setState({
			confirmPass: e.target.value
		});
	};
	handleSubmit = e => {
		e.preventDefault();
	};
	render() {
		return (
			<div className='signUp-Page'>
				<div className='signUp-container'>
					<h3>Create Account</h3>
					{this.state.error}
					<form onSubmit={() => this.handleSubmit}>
						<label htmlFor='fName'>First Name</label>
						<input
							type='text'
							name='fName'
							id='signUp-fName'
							onChange={this.handleFName}
							required
						/>
						<label htmlFor='lname'>Last Name</label>
						<input
							type='text'
							name='lName'
							id='signUp-lname'
							onChange={this.handleLName}
							required
						/>
						<label htmlFor='email'>Email Address</label>
						<input
							type='email'
							name='email'
							id='signUp-email'
							onChange={this.handleEmail}
							required
						/>
						<label htmlFor='pass'>Password</label>
						<input
							type='password'
							name='pass'
							id='signUp-pass'
							onChange={this.handlePass}
							required
						/>
						<label htmlFor='confirmPass'>Confirm Password</label>
						<input
							type='password'
							name='confirmPass'
							id='signUp-re-pass'
							onChange={this.handleConfirmPass}
							required
						/>
						<button type='submit'>Create Account</button>
						<button type='reset'>Clear Form</button>
					</form>
				</div>
			</div>
		);
	}
}
