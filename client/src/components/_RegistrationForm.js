import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

import FormValidation from './__FormValidation';
import { processCountriesObject, createDropdownOptions, fetchTherapiesList } from './__Utils';
import CountriesObj from '../json/countries.json';

class RegistrationForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			countriesList: [],
			therapiesList: [],
			formSubmitted: false,
			formSubmitError: false,
			formSubmitSuccess: false,
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
			countriesList: processCountriesObject(CountriesObj),
		});

		fetchTherapiesList().then(response => {
			this.setState({
				therapiesList: response.data,
			});
		});
	}

	checkFormValid = () => { 
		this.setState({ formValid: ! Object.values(this.state.formFieldValid).includes(false) });
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
			formSubmitError: false
		}, () => {
			const formData = this.state.formFieldValues;
			axios.post('/register', { formData })
			.then(res => {
			  console.log(res);
				this.setState({
					formSubmitSuccess: true
				})
			}).catch(error => 
				this.setState({
					formSubmitted: false,
					formSubmitError: true
				})
			);
		});
	}

	render () {
		return (
			<section className="registration-form">
				<div className="wrapper">
					<h1 className="module-heading module-heading--pink">Sign up</h1>
					{ !this.state.formSubmitSuccess &&
					<>
					<p>Create your account or <Link to="/login">log in</Link></p>
					<form noValidate className="form">
						{ this.state.formSubmitError && <p className="error-message">Sorry, an error occurred. Please try again.</p> }
						<label htmlFor="rfFirstName">First name</label>
						<input type="text" name="rfFirstName" id="rfFirstName" placeholder="First name" onChange={this.handleChange} />
						<label htmlFor="rfLastName">Last name</label>
						<input type="text" name="rfLastName" id="rfLastName" placeholder="Last name" onChange={this.handleChange} />
						<label htmlFor="rfDOB">Date of Birth</label>
						<input type="text" name="rfDOB" id="rfDOB" placeholder="Date of Birth" onChange={this.handleChange} />
						<label htmlFor="rfNationality">Nationality</label>
						<select	name="rfNationality" id="rfNationality" onChange={this.handleChange}>
							<option>Nationality</option>
							{ this.state.countriesList.length > 0 && createDropdownOptions(this.state.countriesList) }
						</select>
						<label htmlFor="rfCountryRes">Country of Residence</label>
						<select	name="rfCountryRes" id="rfCountryRes" onChange={this.handleChange}>
							<option>Country of Residence</option>
							{ this.state.countriesList.length > 0 && createDropdownOptions(this.state.countriesList) }
						</select>
						<label htmlFor="rfEmail">Email</label>
						<input type="email" name="rfEmail" id="rfEmail" placeholder="Email" onChange={this.handleChange} />
						<label htmlFor="rfEmailConfirmation">Email Confirmation</label>
						<input type="email" name="rfEmailConfirmation" id="rfEmailConfirmation" placeholder="Email Confirmation" onChange={this.handleChange} />
						<label htmlFor="rfPassword">Password</label>
						<input type="password" name="rfPassword" id="rfPassword" placeholder="Password" onChange={this.handleChange} />
						<label htmlFor="rfPasswordConfirmation">Password Confirmation</label>
						<input type="password" name="rfPasswordConfirmation" id="rfPasswordConfirmation" placeholder="Password Confirmation" onChange={this.handleChange} />
						<input type="checkbox" id="rfVolunteer" name="rfVolunteer" onChange={this.handleChange} /><label className="inline-label" htmlFor="rfVolunteer">I'd like to be a volunteer</label>
						{this.state.formFieldValues.rfVolunteer && 
						<>
							<label htmlFor="rfFacebook">Facebook URL</label>
							<input type="text" name="rfFacebook" id="rfFacebook" placeholder="Facebook URL" onChange={this.handleChange} />
							<label htmlFor="rfInstagram">Instagram URL</label>
							<input type="text" name="rfInstagram" id="rfInstagram" placeholder="Instagram URL" onChange={this.handleChange} />
							<label htmlFor="rfTherapies">Therapies</label>
							<select	name="rfTherapies" id="rfTherapies" onChange={this.handleChange} multiple>
								<option disabled>Therapies</option>
								{ this.state.therapiesList.length > 0 && createDropdownOptions(this.state.therapiesList) }
							</select>
						</>}
						<input type="checkbox" id="rfTerms" name="rfTerms" onChange={this.handleChange} /><label className="inline-label" htmlFor="rfTerms">I agree with the Terms & Conditions</label>
						<button type="button" className={`btn btn--secondary${this.state.formSubmitted? ' btn--waiting': ''}`} disabled={!this.state.formValid || this.state.formSubmitted} onClick={this.submitForm}>Create account</button>
					</form>
					</>}
					{ this.state.formSubmitSuccess && <p>Thank you for creating your account. You can now <Link to="/login">log in</Link>.</p> }
				</div>
			</section>
		);
	}
}

export default RegistrationForm;
