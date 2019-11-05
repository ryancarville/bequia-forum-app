import React, { Component } from 'react';
import './SignUp.css';
import ForumContext from '../../ForumContext';
import apiService from '../../services/apiServices';
import { Redirect } from 'react-router-dom';
export default class SingUp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			frist_name: '',
			last_name: '',
			email: '',
			user_name: '',
			password: '',
			confirmPass: '',
			error: null
		};
	}
	static contextType = ForumContext;
	handleFirstName = e => {
		this.setState({
			first_name: e.target.value
		});
	};
	handleLastName = e => {
		this.setState({
			last_name: e.target.value
		});
	};
	handleEmail = e => {
		this.setState({
			email: e.target.value
		});
	};
	handleUserName = e => {
		this.setState({
			user_name: e.target.value
		});
	};
	handlePass = e => {
		this.setState({
			password: e.target.value
		});
	};
	handleConfirmPass = e => {
		this.setState({
			confirmPass: e.target.value
		});
	};
	handleSubmit = e => {
		e.preventDefault();
		if (this.state.confirmPass !== this.state.password) {
			this.setState({
				error: 'Passwords do not match.'
			});
			return true;
		}
		const { first_name, last_name, email, user_name, password } = this.state;
		const newUser = { first_name, last_name, email, user_name, password };
		apiService.signUp(newUser).then(data => {
			if (data.error) {
				this.setState({
					error: data.error
				});
			} else {
				this.setState({
					success: true
				});
			}
		});
	};
	render() {
		if (this.state.success) {
			return <Redirect to={'/login'} />;
		}
		return (
			<ForumContext.Consumer>
				{context => (
					<div className='signUp-container'>
						<div className='signUp-content'>
							<h3>Create Account</h3>
							<form onSubmit={this.handleSubmit}>
								{this.state.error}

								<input
									type='text'
									name='fName'
									id='signUp-fName'
									placeholder='First Name'
									onChange={this.handleFirstName}
									required
								/>

								<input
									type='text'
									name='lName'
									id='signUp-lname'
									placeholder='Last Name'
									onChange={this.handleLastName}
									required
								/>

								<input
									type='email'
									name='email'
									id='signUp-email'
									placeholder='Email Address'
									onChange={this.handleEmail}
									required
								/>

								<input
									type='text'
									name='user_name'
									id='signUp-user_name'
									placeholder='User Name'
									onChange={this.handleUserName}
									required
								/>

								<input
									type='password'
									name='pass'
									id='signUp-pass'
									placeholder='Password'
									onChange={this.handlePass}
									required
								/>

								<input
									type='password'
									name='confirmPass'
									id='signUp-re-pass'
									placeholder='Confirm Password'
									onChange={this.handleConfirmPass}
									required
								/>
								<button type='submit' onKeyDownCapture={this.handleSubmit}>
									Create Account
								</button>
								<button type='reset'>Clear Form</button>
							</form>
						</div>
					</div>
				)}
			</ForumContext.Consumer>
		);
	}
}
