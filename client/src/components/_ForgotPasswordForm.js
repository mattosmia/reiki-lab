import React, { Component } from 'react';
import axios from "axios";

import FormValidation from './__FormValidation';
import Loading from './__Loading';

class ForgotPasswordForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			formSubmitted: false,
			formSubmitError: false,
			formSubmitSuccess: false,
			formValid: false,
			formFieldValid: {
				'fpfEmail': false
			},
			formFieldValues: {
				'fpfEmail': ''
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
		const fieldName = e.target.name;
		const fieldValue = e.target.value;
		
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
			loading: true
		}, () => {
			axios.post('/forgot-password', this.state.formFieldValues)
			.then(res => {
				this.setState({
					formSubmitSuccess: true,
					formSubmitted: false,
					formSubmitError: false,
					loading: false
				})
			}).catch(error => 
				this.setState({
					formSubmitSuccess: false,
					formSubmitted: false,
					formSubmitError: true,
					loading: false
				})
			);
		});
	}

	render () {
		return (
			<section className="forgot-password-form">
				<div className="wrapper">
					<h1 className="module-heading module-heading--pink">Forgot password</h1>
					{this.state.loading && <Loading />}
					{! this.state.loading && ! this.state.formSubmitSuccess && <>
					<p>We will send you an email with instructions on how to reset your password</p>
					<form noValidate className="form">
						{! this.state.loading && this.state.formSubmitError && <p className="error-message">There has been an error. Please try again.</p>}
						<label htmlFor="fpfEmail">Email</label>
						<input type="email" name="fpfEmail" id="fpfEmail" placeholder="Email" onChange={this.handleChange} />
						<button type="button" className={`btn btn--secondary${this.state.formSubmitted? ' btn--waiting': ''}`} disabled={!this.state.formValid || this.state.formSubmitted} onClick={this.submitForm}>Email me</button>
					</form></>}
					{! this.state.loading && this.state.formSubmitSuccess &&
					<p>If the email address provided is registered with us, you will receive instructions shortly.</p>}
				</div>
			</section>
		);
	}
}

export default ForgotPasswordForm;
