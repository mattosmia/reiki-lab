import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

import FormValidation from './__FormValidation';
import { returnCountriesObject, createDropdownOptions, fetchList, authHeaders, isAuthenticated } from './__Utils';
import Loading from './__Loading';

class MyAccountForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			countriesList: [],
			therapiesList: [],
			formSubmitted: false,
			formSubmitError: false,
			formSubmitSuccess: false,
			formValid: false,
			showDeleteAccountOptions: false,
			accountDeleted: false,
			formFieldValid: {
				'mafFirstName': false,
				'mafLastName': false,
				'mafDOB': false,
				'mafNationality': false,
				'mafCountryRes': false,
				'mafPassword': true,
				'mafPasswordConfirmation': true,
				'mafVolunteer': false,
				'mafFacebook': false,
				'mafInstagram': false,
				'mafTherapies': false
			},
			formFieldValues: {
				'mafFirstName': '',
				'mafLastName': '',
				'mafDOB': '',
				'mafNationality': '',
				'mafCountryRes': '',
				'mafEmail': '',
				'mafPassword': '',
				'mafPasswordConfirmation': '',
				'mafVolunteer': false,
				'mafFacebook': '',
				'mafInstagram': '',
				'mafTherapies': []
			}
		}
	}
	componentDidMount() {
		isAuthenticated().then(user => {
			if (! Object.keys(user).length) {
				this.props.history.replace('/login');
			} else {
				this.setState({
					countriesList: returnCountriesObject()
				}, () => {
					fetchList('/therapies').then(response => {
						this.setState({
							therapiesList: response.data,
						}, () => {
							fetchList('/account-details', authHeaders()).then(response => {
									this.setState({
										formFieldValues: response.data,
										loading: false
									}, () => {
										let obj = {};
										for (let fieldName of Object.keys(this.state.formFieldValid)) {
											obj = {...obj, ...FormValidation(fieldName, this.state.formFieldValues) }
										}
										this.setValidateFields(obj)
									});
								}
							).catch(error => {
								console.log(error)
							})
						});
					});
				});
			}
		})
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
			axios.post('/update-account', this.state.formFieldValues, authHeaders())
			.then(res => {
				this.setState({
					formSubmitSuccess: true,
					formSubmitted: false,
					formSubmitError: false,
					formFieldValues: {...this.state.formFieldValues, mafPassword: '', mafPasswordConfirmation: ''}
				})
			}).catch(error => {
				this.setState({
					formSubmitted: false,
					formSubmitError: true,
					formSubmitSuccess: false
				});
				if (error.response.status === 401 || error.response.status === 403) {
					this.props.history.push('/login');
				}
			});
		});
	}

	deleteAccount = () => {
		this.setState({
			formSubmitted: true,
			formSubmitError: false
		}, () => {
			axios.post('/delete-account', {}, authHeaders())
			.then(res => {
				this.setState({
					formSubmitSuccess: true,
					accountDeleted: true,
					formSubmitted: false
				})
			}).catch(error => {
				this.setState({
					formSubmitted: false,
					formSubmitError: true,
					formSubmitSuccess: false
				});
				if (error.response.status === 401 || error.response.status === 403) {
					this.props.history.push('/login');
				}
			});
		});
	}

	render () {
		return (
			<section className="my-account-form">
				<div className="wrapper">
					<h1 className="module-heading module-heading--pink">My account</h1>
					{ this.state.loading && <Loading />}
					{ this.state.accountDeleted && <p>Your account has been deleted. Please go back to our <Link to="/">homepage</Link>.</p>}
					{ ! this.state.loading && ! this.state.accountDeleted &&
					<>
					<p>Update your account details or <Link to="/logout">log out</Link></p>
					<form noValidate className="form">
						{ this.state.formSubmitSuccess && <p className="success-message">Your account has been updated.</p> }
						{ this.state.formSubmitError && <p className="error-message">Sorry, an error occurred. Please try again.</p> }
						<label htmlFor="mafFirstName">First name</label>
						<input type="text" name="mafFirstName" id="mafFirstName" placeholder="First name" onChange={this.handleChange} defaultValue={this.state.formFieldValues.mafFirstName} />
						<label htmlFor="mafLastName">Last name</label>
						<input type="text" name="mafLastName" id="mafLastName" placeholder="Last name" onChange={this.handleChange} defaultValue={this.state.formFieldValues.mafLastName} />
						<label htmlFor="mafDOB">Date of Birth</label>
						<input type="text" name="mafDOB" id="mafDOB" placeholder="Date of Birth" onChange={this.handleChange} defaultValue={this.state.formFieldValues.mafDOB} />
						<label htmlFor="mafNationality">Nationality</label>
						<select	name="mafNationality" id="mafNationality" defaultValue={this.state.formFieldValues.mafNationality} onChange={this.handleChange}>
							<option>Nationality</option>
							{ createDropdownOptions(this.state.countriesList) }
						</select>
						<label htmlFor="mafCountryRes">Country of Residence</label>
						<select	name="mafCountryRes" id="mafCountryRes" defaultValue={this.state.formFieldValues.mafCountryRes} onChange={this.handleChange}>
							<option>Country of Residence</option>
							{ createDropdownOptions(this.state.countriesList) }
						</select>
						<label htmlFor="mafEmail">Email</label>
						<input type="email" name="mafEmail" id="mafEmail" placeholder="Email" defaultValue={this.state.formFieldValues.mafEmail} />
						<input type="checkbox" id="mafVolunteer" name="mafVolunteer" onChange={this.handleChange} checked={this.state.formFieldValues.mafVolunteer} /><label className="inline-label" htmlFor="mafVolunteer">I'd like to be a volunteer</label>
						{this.state.formFieldValues.mafVolunteer && 
						<>
							<label htmlFor="mafFacebook">Facebook URL</label>
							<input type="text" name="mafFacebook" id="mafFacebook" placeholder="Facebook URL" onChange={this.handleChange} defaultValue={this.state.formFieldValues.mafFacebook} onFocus={this.handleFocus} onBlur={this.handleBlur} />
							<label htmlFor="mafInstagram">Instagram URL</label>
							<input type="text" name="mafInstagram" id="mafInstagram" placeholder="Instagram URL" onChange={this.handleChange} defaultValue={this.state.formFieldValues.mafInstagram} onFocus={this.handleFocus} onBlur={this.handleBlur} />
							<label htmlFor="mafTherapies">Therapies</label>
							<select	name="mafTherapies" id="mafTherapies" defaultValue={this.state.formFieldValues.mafTherapies} onChange={this.handleChange} multiple>
								<option disabled>Therapies</option>
								{ createDropdownOptions(this.state.therapiesList) }
							</select>
						</>}
						<label htmlFor="mafPassword">Password</label>
						<input type="password" name="mafPassword" id="mafPassword" placeholder="Password" onChange={this.handleChange} />
						<label htmlFor="mafPasswordConfirmation">Password Confirmation</label>
						<input type="password" name="mafPasswordConfirmation" id="mafPasswordConfirmation" placeholder="Password Confirmation" onChange={this.handleChange} />
						<button type="button" className={`btn btn--secondary${this.state.formSubmitted? ' btn--waiting': ''}`} disabled={!this.state.formValid || this.state.formSubmitted} onClick={this.submitForm}>Save changes</button>
						<p className="small"><span className="a-link" onClick={() => this.setState({ showDeleteAccountOptions: true })}>Delete my account</span></p>
						{ this.state.showDeleteAccountOptions && 
						<div className="my-account-form__delete">
							<p>Are you sure you'd like to delete your account?</p>
							<div className="my-account-form__delete__buttons">
								<button type="button" className={`btn btn--grey${this.state.formSubmitted? ' btn--waiting': ''}`} onClick={this.deleteAccount}>Yes</button>
								<button type="button" className={`btn btn--secondary${this.state.formSubmitted? ' btn--waiting': ''}`} onClick={() => this.setState({ showDeleteAccountOptions: false })}>No</button>
							</div>
						</div>}
					</form>
					</>}
				</div>}
			</section>
		);
	}
}

export default MyAccountForm;
