import React, { Component } from 'react';
import './contactUs.css';

export default class ContactUs extends Component {
	constructor(props) {
		super(props);
		this.state = {
			full_name: '',
			email: '',
			reason: '',
			comment: '',
			success: false,
			error: null
		};
	}
	handleName = e => {
		this.setState({
			full_name: e.target.value
		});
	};
	handleEmail = e => {
		this.setState({
			email: e.target.value
		});
	};
	handleReason = e => {
		this.setState({
			reason: e.target.value
		});
	};
	handleComment = e => {
		this.setState({
			comment: e.target.value
		});
	};
	handleSubmit = e => {
		e.preventDefault();

		this.setState({ success: true });
	};
	render() {
		const contactForm = (
			<form onSubmit={this.handleSubmit}>
				<label htmlFor='fullName'>Full Name</label>
				<input type='text' name='fullName' id='fullName-contact' required />
				<label htmlFor='email'>Email</label>
				<input type='email' name='email' id='email-contact' required />
				<label htmlFor='contact-reason'>What can we help you with?</label>
				<select name='contact-reason' id='reason-contact'>
					<option value='general'>General Question</option>
					<option value='technical'>Technical</option>
					<option value='ads'>Advertise with Us</option>
					<option value='donate'>Questions about Donations</option>
					<option value='report-issue'>Report a issue</option>
					<option value='controbution'>
						Have an idea to make the site better
					</option>
				</select>
				<label htmlFor='comment'>Comment</label>
				<textarea
					name='comment'
					id='comment-contact'
					cols='30'
					rows='10'></textarea>
				<span>
					<button type='submit'>Send</button>
					<button type='reset'>Clear Form</button>
					<button type='button' onClick={() => this.props.history.goBack()}>
						Cancel
					</button>
				</span>
			</form>
		);
		const sucessMsg = (
			<section>
				<div>
					<h3>Message Received!</h3>
					<p>Thank you for your message. We will respond within 24 hours.</p>
					<button type='button' onClick={() => this.props.history.go(-2)}>
						Exit Contact Form
					</button>
				</div>
			</section>
		);
		return (
			<section className='contact-form-container'>
				{this.state.success ? sucessMsg : contactForm}
			</section>
		);
	}
}
