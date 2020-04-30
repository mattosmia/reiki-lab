import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

import FormValidation from './__FormValidation';
import { fetchList } from './__Utils';
import Loading from './__Loading';

class ResetPasswordForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			formSubmitted: false,
			formFatalError: false,
			requestError: false,
			requestSuccess: false,
			formValid: false,
			formFieldValid: {
				'rpfKey': true,
				'rpfPassword': false,
				'rpfPasswordConfirmation': false
			},
			formFieldValues: {
				'rpfKey': this.props.emailKey,
				'rpfPassword': '',
				'rpfPasswordConfirmation': ''
			}
		}
	}

	componentDidMount() {
		let obj = {};
		for (let fieldName of Object.keys(this.state.formFieldValid)) {
			obj = {...obj, ...FormValidation(fieldName, this.state.formFieldValues) }
		}
		this.setValidateFields(obj);

		fetchList('/check-reset-key', { params: { rpfKey: this.props.emailKey }}).then(response => {
			this.setState({
				formFatalError: Boolean(response.data.error),
				loading: false
			});
		});
	}

	checkFormValid = () => { 
		console.log('this.checkFormValid',this.state.formFieldValid)
		this.setState({ formValid: ! Object.values(this.state.formFieldValid).includes(false) });
	}

	handleChange = (e) => {
		e.persist();
		const fieldName = e.target.name;
		const fieldValue = e.target.value;
		
		this.setState({
			formFieldValues: { ...this.state.formFieldValues, [fieldName]: fieldValue },
			requestError: false
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
			requestError: false,
			loading: true
		}, () => {
			axios.post('/reset-password', this.state.formFieldValues)
			.then(res => {
				this.setState({
					requestSuccess: true,
					formSubmitted: false,
					requestError: false,
					loading: false
				})
			}).catch(error => 
				this.setState({
					requestSuccess: false,
					formSubmitted: false,
					requestError: true,
					loading: false
				})
			);
		});
	}

	render () {
		return (
			<section className="reset-password-form">
				<div className="wrapper">
					<h1 className="module-heading module-heading--pink">Reset password</h1>
					{this.state.loading && <Loading />}
					{! this.state.loading && ! this.state.requestSuccess && ! this.state.formFatalError && <>
					<p>Please enter your new password below</p>
					<form noValidate className="form">
						{! this.state.loading && this.state.requestError && <p className="error-message">Sorry, an error occurred. Please try again.</p>}
						<label htmlFor="rpfPassword">Password</label>
						<input type="password" name="rpfPassword" id="rpfPassword" placeholder="Password" onChange={this.handleChange} />
						<span className="form__field-description">Minimum 6 characters</span>
						<label htmlFor="rpfPasswordConfirmation">Password Confirmation</label>
						<input type="password" name="rpfPasswordConfirmation" id="rpfPasswordConfirmation" placeholder="Password Confirmation" onChange={this.handleChange} />
						<button type="button" className={`btn btn--secondary${this.state.formSubmitted? ' btn--waiting': ''}`} disabled={!this.state.formValid || this.state.formSubmitted} onClick={this.submitForm}>Change password</button>
					</form></>}
					{! this.state.loading && this.state.requestSuccess &&
					<p className="success-message">Your password has been updated. Please <Link to={'/login'}>log in</Link> with your new credentials.</p>}
					{! this.state.loading && this.state.formFatalError &&
					<p className="success-message">Your link seems to have expired. Please request another password reset link <Link to={'/forgot-password'}>here</Link>.</p>}
				</div>
			</section>
		);
	}
}

export default ResetPasswordForm;
