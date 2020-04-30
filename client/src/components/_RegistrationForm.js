import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

import FormValidation from './__FormValidation';
import { returnCountriesObject, createDropdownOptions, fetchList } from './__Utils';
import Loading from './__Loading';

class RegistrationForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			countriesList: [],
			therapiesList: [],
			formSubmitted: false,
			requestError: false,
			requestSuccess: false,
			requestUserExists: false,
			formValid: false,
			formFieldValid: {
				'rfFirstName': false,
				'rfLastName': false,
				'rfDOB': false,
				'rfNationality': false,
				'rfCountryRes': false,
				'rfEmail': false,
				'rfEmailConfirmation': false,
				'rfPassword': false,
				'rfPasswordConfirmation': false,
				'rfVolunteer': false,
				'rfFacebook': false,
				'rfInstagram': false,
				'rfTherapies': false,
				'rfTerms': false
			},
			formFieldValues: {
				'rfFirstName': '',
				'rfLastName': '',
				'rfDOB': '',
				'rfNationality': '',
				'rfCountryRes': '',
				'rfEmail': '',
				'rfEmailConfirmation': '',
				'rfPassword': '',
				'rfPasswordConfirmation': '',
				'rfVolunteer': false,
				'rfFacebook': '',
				'rfInstagram': '',
				'rfTherapies': [],
				'rfTerms': false
			}
		}
	}

	componentDidMount() {
		let obj = {};
		for (let fieldName of Object.keys(this.state.formFieldValid)) {
			obj = {...obj, ...FormValidation(fieldName, this.state.formFieldValues) }
		}
		this.setValidateFields(obj);

		this.setState({
			countriesList: returnCountriesObject()
		}, () => fetchList('/therapies').then(response => {
			this.setState({
				therapiesList: response.data,
				loading: false
			});
		}));
	}

	checkFormValid = () => { 
		this.setState({ formValid: ! Object.values(this.state.formFieldValid).includes(false) });
	}

	handleFocus = (e) => {
		if (e.target.value === '') {
			if (e.target.name === 'rfFacebook'){
				e.target.value = 'https://facebook.com/';
			} else if (e.target.name === 'rfInstagram'){
				e.target.value = 'https://instagram.com/';
			}
		}
	}

	handleBlur = (e) => {
		if ((e.target.name === 'rfFacebook' && e.target.value === 'https://facebook.com/') || (e.target.name === 'rfInstagram' && e.target.value === 'https://instagram.com/')) {
			e.target.value = ''
		}
		if (! this.state.formFieldValid[e.target.name]) {
			e.target.classList.add('error-field')
		} else {
			e.target.classList.remove('error-field')
		}
	}

	handleChange = (e) => {
		e.persist();
		const fieldName = e.target.name;

		let fieldValue;
		
		switch (e.target.type) {
			case 'checkbox':
				fieldValue = e.target.checked;
			break;
			case 'select-multiple':
				fieldValue = [];
				const allOptions = e.target.options;
				for (let i = 0; i < allOptions.length; i++) {
					if (allOptions[i].selected) fieldValue.push(allOptions[i].value);
				}
			break;
			default:
				fieldValue = e.target.value;
		}

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
			loading: true,
			formSubmitted: true,
			requestError: false
		}, () => {
			axios.post('/register', this.state.formFieldValues)
			.then(res => {
				this.setState({
					loading: false,
					requestSuccess: true,
					requestUserExists: false
				})
			}).catch(error => {
				const isUserExistsError = (error.response && error.response.data && error.response.data.msg === 'User exists') ? true : false;
				this.setState({
					loading: false,
					formSubmitted: false,
					requestError: true,
					requestUserExists: isUserExistsError
				})
			}
			);
		});
	}

	render () {
		return (
			<section className="registration-form">
				<div className="wrapper">
					<h1 className="module-heading module-heading--pink">Sign up</h1>
					{ this.state.loading && <Loading />}
					{ ! this.state.loading && !this.state.requestSuccess && !this.state.requestUserExists &&
					<>
					<p>Create your account or <Link to="/login">log in</Link></p>
					<form noValidate className="form">
						{ this.state.requestError && <p className="error-message">Sorry, an error occurred. Please try again.</p> }
						<label htmlFor="rfFirstName">First name</label>
						<input type="text" name="rfFirstName" id="rfFirstName" placeholder="First name *" onChange={this.handleChange} onBlur={this.handleBlur} />
						<span className="form__field-description">No special characters allowed</span>
						<label htmlFor="rfLastName">Last name</label>
						<input type="text" name="rfLastName" id="rfLastName" placeholder="Last name *" onChange={this.handleChange} onBlur={this.handleBlur} />
						<span className="form__field-description">No special characters allowed</span>
						<label htmlFor="rfDOB">Date of birth</label>
						<input type="text" name="rfDOB" id="rfDOB" placeholder="Date of birth *" maxLength="10" onChange={this.handleChange} onBlur={this.handleBlur} />
						<span className="form__field-description">Date format DD/MM/YYYY</span>
						<label htmlFor="rfNationality">Nationality</label>
						<select	name="rfNationality" id="rfNationality" onChange={this.handleChange} onBlur={this.handleBlur}>
							<option>Nationality *</option>
							{ this.state.countriesList.length > 0 && createDropdownOptions(this.state.countriesList) }
						</select>
						<label htmlFor="rfCountryRes">Country of residence</label>
						<select	name="rfCountryRes" id="rfCountryRes" onChange={this.handleChange} onBlur={this.handleBlur}>
							<option>Country of residence *</option>
							{ this.state.countriesList.length > 0 && createDropdownOptions(this.state.countriesList) }
						</select>
						<label htmlFor="rfEmail">Email</label>
						<input type="email" name="rfEmail" id="rfEmail" placeholder="Email *" onChange={this.handleChange} onBlur={this.handleBlur} />
						<label htmlFor="rfEmailConfirmation">Email confirmation</label>
						<input type="email" name="rfEmailConfirmation" id="rfEmailConfirmation" placeholder="Email Confirmation *" onChange={this.handleChange} onBlur={this.handleBlur} />
						<label htmlFor="rfPassword">Password</label>
						<input type="password" name="rfPassword" id="rfPassword" placeholder="Password *" onChange={this.handleChange} onBlur={this.handleBlur} />
						<span className="form__field-description">Minimum 6 characters</span>
						<label htmlFor="rfPasswordConfirmation">Password Confirmation</label>
						<input type="password" name="rfPasswordConfirmation" id="rfPasswordConfirmation" placeholder="Password Confirmation *" onChange={this.handleChange} onBlur={this.handleBlur} />
						<input type="checkbox" id="rfVolunteer" name="rfVolunteer" onChange={this.handleChange} /><label className="inline-label" htmlFor="rfVolunteer">I'd like to be a volunteer</label>
						{this.state.formFieldValues.rfVolunteer && 
						<>
							<label htmlFor="rfFacebook">Facebook URL</label>
							<input type="text" name="rfFacebook" id="rfFacebook" placeholder="Facebook URL" onChange={this.handleChange} onFocus={this.handleFocus} onBlur={this.handleBlur} />
							<label htmlFor="rfInstagram">Instagram URL</label>
							<input type="text" name="rfInstagram" id="rfInstagram" placeholder="Instagram URL" onChange={this.handleChange} onFocus={this.handleFocus} onBlur={this.handleBlur} />
							<label htmlFor="rfTherapies">Therapies</label>
							<select	name="rfTherapies" id="rfTherapies" onChange={this.handleChange} onBlur={this.handleBlur} multiple>
								<option disabled>Therapies *</option>
								{ this.state.therapiesList.length > 0 && createDropdownOptions(this.state.therapiesList) }
							</select>
						</>}
						<input type="checkbox" id="rfTerms" name="rfTerms" onChange={this.handleChange} onBlur={this.handleBlur} /><label className="inline-label" htmlFor="rfTerms">I agree with the <Link to="/terms-conditions">Terms & Conditions</Link> *</label>
						<button type="button" className={`btn btn--secondary${this.state.formSubmitted? ' btn--waiting': ''}`} disabled={!this.state.formValid || this.state.formSubmitted} onClick={this.submitForm}>Create account</button>
					</form>
					</>}
					{ ! this.state.loading && this.state.requestSuccess && <p>Thank you for creating your account. You can now <Link to="/login">log in</Link>.</p> }
					{ ! this.state.loading && this.state.requestUserExists && <p>Your email address is already registered. <Link to="/login">Log in</Link> or <Link to="/forgot-password">reset your password</Link></p> }
				</div>
			</section>
		);
	}
}

export default RegistrationForm;
