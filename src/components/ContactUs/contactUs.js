import React, { Component } from 'react';
import './contactUs.css';
//contact form
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
	componentDidMount() {
		window.scroll(0, 0);
	}
	
	render() {
		const contactForm = (
			<form onSubmit={this.handleSubmit}>
				<input
					type='text'
					name='fullName'
					id='fullName-contact'
					placeholder='Full Name'
					required
				/>

				<input
					type='email'
					name='email'
					id='email-contact'
					placeholder='Email Address'
					required
				/>

				<select name='contact-reason' id='reason-contact'>
					<option selected disabled value=''>
						What can we help you with?
					</option>
					<option value='general'>General Question</option>
					<option value='technical'>Technical</option>
					<option value='ads'>Advertise with Us</option>
					<option value='donate'>Questions about Donations</option>
					<option value='report-issue'>Report a issue</option>
					<option value='controbution'>
						Have an idea to make the site better
					</option>
				</select>

				<textarea
					name='comment'
					id='comment-contact'
					placeholder='Enter comments here...'
					required
				/>
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
			<article>
				<header>
					<h3>Message Received!</h3>
				</header>
				<p>Thank you for your message. We will respond within 24 hours.</p>
				<button type='button' onClick={() => this.props.history.go(-2)}>
					Exit Contact Form
				</button>
			</article>
		);
		return (
			<section className='contact-form-container'>
				{this.state.success ? sucessMsg : contactForm}
			</section>
		);
	}
}
