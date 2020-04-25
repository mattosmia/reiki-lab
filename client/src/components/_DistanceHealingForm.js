import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

import FormValidation from './__FormValidation';
import { processCountriesObject, createDropdownOptions } from './__Utils';
import CountriesObj from '../json/countries.json';

class DistanceHealingForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			countriesList: [],
			formSubmitted: false,
			formSubmitError: false,
			formSubmitSuccess: false,
			formValid: false,
			formFieldValid: {
				'dhfFullName': false,
				'dhfDOB': false,
				'dhfCountryRes': false,
				'dhfConfirmList': false,
				'dhfTerms': false
			},
			formFieldValues: {
				'dhfFullName': '',
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
			countriesList: processCountriesObject(CountriesObj),
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
			<section className="distance-healing-form">
				<div className="wrapper">
					{ !this.state.formSubmitSuccess &&
					<>
					<form noValidate className="form">
						{ this.state.formSubmitError && <p className="error-message">Sorry, an error occurred. Please try again.</p> }>
						<label htmlFor="dhfFullName">Full name</label>
						<input type="text" name="dhfFullName" id="dhfFullName" placeholder="Full name" onChange={this.handleChange} />
						<label htmlFor="dhfDOB">Date of Birth</label>
						<input type="text" name="dhfDOB" id="dhfDOB" placeholder="Date of Birth" onChange={this.handleChange} />
						<label htmlFor="dhfCountryRes">Country of Residence</label>
						<select	name="dhfCountryRes" id="dhfCountryRes" onChange={this.handleChange}>
							<option>Country of Residence</option>
							{ this.state.countriesList.length > 0 && createDropdownOptions(this.state.countriesList) }
						</select>
						<input type="checkbox" id="dhfConfirmList" name="dhfConfirmList" onChange={this.handleChange} /><label className="inline-label" htmlFor="dhfConfirmList">Please, place me on this month's distance healing list</label>
						<input type="checkbox" id="dhfTerms" name="dhfTerms" onChange={this.handleChange} /><label className="inline-label" htmlFor="dhfTerms">I agree with the Terms & Conditions</label>
						<button type="button" className={`btn btn--secondary${this.state.formSubmitted? ' btn--waiting': ''}`} disabled={!this.state.formValid || this.state.formSubmitted} onClick={this.submitForm}>Add me to the list</button>
					</form>
					</>}
					{ this.state.formSubmitSuccess && <p>Thank you for creating your account. You can now <Link to="/login">log in</Link>.</p> }
				</div>
			</section>
		);
	}
}

export default DistanceHealingForm;
