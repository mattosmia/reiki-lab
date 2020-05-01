import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

import FormValidation from './__FormValidation';
import { returnCountriesObject, createDropdownOptions } from './__Utils';
import Loading from './__Loading';

class DistanceHealingForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			countriesList: [],
			formSubmitted: false,
			requestError: false,
			requestSuccess: false,
			formValid: false,
			formFieldValid: {
				'dhfFirstName': false,
				'dhfLastName': false,
				'dhfDOB': false,
				'dhfCountryRes': false,
				'dhfConfirmList': false,
				'dhfTerms': false
			},
			formFieldValues: {
				'dhfFirstName': '',
				'dhfLastName': '',
				'dhfDOB': '',
				'dhfCountryRes': '',
				'dhfConfirmList': false,
				'dhfTerms': false
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
			countriesList: returnCountriesObject(),
			loading: false
		});
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
			requestError: false
		}, () => {
			this.setValidateFields(FormValidation(fieldName, this.state.formFieldValues));
		})
	}

	handleBlur = (e) => {
		if (! this.state.formFieldValid[e.target.name]) {
			e.target.classList.add('error-field')
		} else {
			e.target.classList.remove('error-field')
		}
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
			axios.post('/distance-healing', this.state.formFieldValues)
			.then(res => {
				this.setState({
					loading: false,
					requestSuccess: true
				})
			}).catch(error => 
				this.setState({
					loading: false,
					formSubmitted: false,
					requestError: true
				})
			);
		});
	}

	render () {
		return (
			<section className="distance-healing-form">
				<div className="wrapper">
					{ !this.state.requestSuccess &&
					<>
					<form noValidate className="form">
						{ this.state.loading && <Loading /> }
						{ ! this.state.loading && <>
						{ this.state.requestError && <p className="error-message">Sorry, an error occurred. Please try again.</p> }
						<label htmlFor="dhfFirstName">First name</label>
						<input type="text" name="dhfFirstName" id="dhfFirstName" placeholder="First name *" onChange={this.handleChange} onBlur={this.handleBlur} />
						<span className="form__field-description">No special characters allowed</span>
						<label htmlFor="dhfLastName">Last name</label>
						<input type="text" name="dhfLastName" id="dhfLastName" placeholder="Last name *" onChange={this.handleChange} onBlur={this.handleBlur} />
						<span className="form__field-description">No special characters allowed</span>
						<label htmlFor="dhfDOB">Date of birth</label>
						<input type="text" name="dhfDOB" id="dhfDOB" placeholder="Date of birth *" onChange={this.handleChange} onBlur={this.handleBlur} />
						<span className="form__field-description">Date format DD/MM/YYYY</span>
						<label htmlFor="dhfCountryRes">Country of residence</label>
						<select	name="dhfCountryRes" id="dhfCountryRes" onChange={this.handleChange} onBlur={this.handleBlur}>
							<option>Country of residence *</option>
							{ this.state.countriesList.length > 0 && createDropdownOptions(this.state.countriesList) }
						</select>
						<input type="checkbox" id="dhfConfirmList" name="dhfConfirmList" onChange={this.handleChange} onBlur={this.handleBlur} /><label className="inline-label" htmlFor="dhfConfirmList">Please, place me on this month's distance healing list *</label>
						<input type="checkbox" id="dhfTerms" name="dhfTerms" onChange={this.handleChange} onBlur={this.handleBlur} /><label className="inline-label" htmlFor="dhfTerms">I agree with the <Link to="/terms-conditions" target="_blank" rel="noopener noreferrer">Terms & Conditions</Link> *</label>
						<button type="button" className={`btn btn--secondary${this.state.formSubmitted? ' btn--waiting': ''}`} disabled={!this.state.formValid || this.state.formSubmitted} onClick={this.submitForm}>Add me to the list</button>
						</>}
					</form>
					</>}
					{ this.state.requestSuccess && <p className="success-message">Thank you for submitting your details. You are now on this month's Distance Healing list.</p> }
				</div>
			</section>
		);
	}
}

export default DistanceHealingForm;
