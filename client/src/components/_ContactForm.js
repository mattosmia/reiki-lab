import React, { Component } from 'react';
import axios from "axios";

import envelope from '../images/04-envelope.svg';

import FormValidation from './__FormValidation';

class ContactForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			countriesList: [],
			formSubmitted: false,
			formSubmitError: false,
			formSubmitSuccess: false,
			formValid: false,
			formFieldValid: {
				'cfName': false,
				'cfEmail': false,
				'cfSubject': false,
				'cfMessage': false
			},
			formFieldValues: {
				'cfName': '',
				'cfEmail': '',
				'cfSubject': '',
				'cfMessage': ''
			}
		}
	}

	componentDidMount() {
		let obj = {};
		for (let fieldName of Object.keys(this.state.formFieldValid)) {
			obj = {...obj, ...FormValidation(fieldName, this.state.formFieldValues) }
		}
		this.setValidateFields(obj);
	}

	checkFormValid = () => { 
		this.setState({ formValid: ! Object.values(this.state.formFieldValid).includes(false) });
	}

	handleChange = (e) => {
		e.persist();
		const fieldValue = (e.target.type === 'checkbox'? e.target.checked : e.target.value);
		const fieldName = e.target.name;
		this.setState({
			formFieldValues: { ...this.state.formFieldValues, [fieldName]: fieldValue },
			formSubmitError: false
		}, () => {
			this.setValidateFields(FormValidation(fieldName, this.state.formFieldValues));
		})
	}

	setValidateFields = (obj) => {
		this.setState({
			formFieldValid: {
				...this.state.formFieldValid,
				...obj
			}
		}, () => this.checkFormValid());
	}

	submitForm = () => {
		this.setState({
			formSubmitted: true,
			formSubmitError: false,
			formSubmitSuccess: false
		}, () => {
			axios.post('/contact', this.state.formFieldValues)
			.then(res => {
				this.setState({
					formSubmitted: false,
					formSubmitError: false,
					formSubmitSuccess: true
				})
			}).catch(error => 
				this.setState({
					formSubmitted: false,
					formSubmitError: true,
					formSubmitSuccess: false
				})
			);
		});
	}

	render () {
		return (
			<section className="contact-form">
				<div className="wrapper">
					<h1 className="module-heading">Get in touch</h1>
					<form noValidate className="form">
						<img className="contact-form__icon" src={envelope} alt="Contact form" />
						{ this.state.formSubmitSuccess && <p className="success-message">Thanks for your message, we will be in touch shortly</p> }>
						{ this.state.formSubmitError && <p className="error-message">Sorry, an error occurred. Please try again.</p> }>
						<label htmlFor="cfName">Full name</label>
						<input type="text" name="cfName" id="cfName" placeholder="Full name" onChange={this.handleChange} />
						<label htmlFor="cfEmail">Email address</label>
						<input type="email" name="cfEmail" id="cfEmail" placeholder="Email address" onChange={this.handleChange} />
						<label htmlFor="cfSubject">Subject</label>
						<input type="text" name="cfSubject" id="cfSubject" placeholder="Subject" onChange={this.handleChange} />
						<label htmlFor="cfMessage">Message</label>
						<textarea name="cfMessage" id="cfMessage" placeholder="Message" onChange={this.handleChange}></textarea>
						<button type="button" className={`btn btn--secondary${this.state.formSubmitted? ' btn--waiting': ''}`} disabled={!this.state.formValid || this.state.formSubmitted} onClick={this.submitForm}>Send message</button>
					</form>
				</div>
			</section>
		);
	}
}

export default ContactForm;