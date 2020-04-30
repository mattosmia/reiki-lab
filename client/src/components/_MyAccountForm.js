import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

import FormValidation from './__FormValidation';
import { returnCountriesObject, createDropdownOptions, fetchList, authHeaders, isAuthenticated } from './__Utils';
import Loading from './__Loading';
import UploadAvatar from './_UploadAvatar';

class MyAccountForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			countriesList: [],
			therapiesList: [],
			formSubmitted: false,
			requestError: false,
			requestSuccess: false,
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
			this.props.setAuth(user);
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
			if (e.target.name === 'mafFacebook'){
				e.target.value = 'https://facebook.com/';
			} else if (e.target.name === 'mafInstagram'){
				e.target.value = 'https://instagram.com/';
			}
		}
	}

	handleBlur = (e) => {
		if ((e.target.name === 'mafFacebook' && e.target.value === 'https://facebook.com/') || (e.target.name === 'mafInstagram' && e.target.value === 'https://instagram.com/')) {
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
			formSubmitted: true,
			requestError: false
		}, () => {
			axios.post('/update-account', this.state.formFieldValues, authHeaders())
			.then(res => {
				this.setState({
					requestSuccess: true,
					formSubmitted: false,
					requestError: false,
					formFieldValues: {...this.state.formFieldValues, mafPassword: '', mafPasswordConfirmation: ''}
				})
			}).catch(error => {
				this.setState({
					formSubmitted: false,
					requestError: true,
					requestSuccess: false
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
			requestError: false
		}, () => {
			axios.post('/delete-account', {}, authHeaders())
			.then(res => {
				this.setState({
					requestSuccess: true,
					accountDeleted: true,
					formSubmitted: false
				})
			}).catch(error => {
				this.setState({
					formSubmitted: false,
					requestError: true,
					requestSuccess: false
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
						{ this.state.requestSuccess && <p className="success-message">Your account has been updated.</p> }
						{ this.state.requestError && <p className="error-message">Sorry, an error occurred. Please try again.</p> }
						<UploadAvatar />
						<label htmlFor="mafFirstName">First name</label>
						<input type="text" name="mafFirstName" id="mafFirstName" placeholder="First name *" onChange={this.handleChange} onBlur={this.handleBlur} defaultValue={this.state.formFieldValues.mafFirstName} />
						<span className="form__field-description">No special characters allowed</span>
						<label htmlFor="mafLastName">Last name</label>
						<input type="text" name="mafLastName" id="mafLastName" placeholder="Last name *" onChange={this.handleChange} onBlur={this.handleBlur} defaultValue={this.state.formFieldValues.mafLastName} />
						<span className="form__field-description">No special characters allowed</span>
						<label htmlFor="mafDOB">Date of bßirth</label>
						<input type="text" name="mafDOB" id="mafDOB" placeholder="Date of birth *" onChange={this.handleChange} onBlur={this.handleBlur} defaultValue={this.state.formFieldValues.mafDOB} />
						<span className="form__field-description">Date format DD/MM/YYYY</span>
						<label htmlFor="mafNationality">Nationality</label>
						<select	name="mafNationality" id="mafNationality" defaultValue={this.state.formFieldValues.mafNationality} onBlur={this.handleBlur} onChange={this.handleChange}>
							<option>Nationality *</option>
							{ createDropdownOptions(this.state.countriesList) }
						</select>
						<label htmlFor="mafCountryRes">Country of r</label>
						<select	name="mafCountryRes" id="mafCountryRes" defaultValue={this.state.formFieldValues.mafCountryRes} onBlur={this.handleBlur} onChange={this.handleChange}>
							<option>Country of residence *</option>
							{ createDropdownOptions(this.state.countriesList) }
						</select>
						<label htmlFor="mafEmail">Email</label>
						<input type="email" name="mafEmail" id="mafEmail" placeholder="Email *" onBlur={this.handleBlur} onChange={this.handleChange} defaultValue={this.state.formFieldValues.mafEmail} />
						<input type="checkbox" id="mafVolunteer" name="mafVolunteer" onChange={this.handleChange} onBlur={this.handleBlur} checked={this.state.formFieldValues.mafVolunteer} /><label className="inline-label" htmlFor="mafVolunteer">I'd like to be a volunteer</label>
						{this.state.formFieldValues.mafVolunteer && 
						<>
							<label htmlFor="mafFacebook">Facebook URL</label>
							<input type="text" name="mafFacebook" id="mafFacebook" placeholder="Facebook URL" onChange={this.handleChange} defaultValue={this.state.formFieldValues.mafFacebook} onFocus={this.handleFocus} onBlur={this.handleBlur} />
							<label htmlFor="mafInstagram">Instagram URL</label>
							<input type="text" name="mafInstagram" id="mafInstagram" placeholder="Instagram URL" onChange={this.handleChange} defaultValue={this.state.formFieldValues.mafInstagram} onFocus={this.handleFocus} onBlur={this.handleBlur} />
							<label htmlFor="mafTherapies">Therapies</label>
							<select	name="mafTherapies" id="mafTherapies" defaultValue={this.state.formFieldValues.mafTherapies} onChange={this.handleChange} onBlur={this.handleBlur} multiple>
								<option disabled>Therapies *</option>
								{ createDropdownOptions(this.state.therapiesList) }
							</select>
						</>}
						<label htmlFor="mafPassword">Password</label>
						<input type="password" name="mafPassword" id="mafPassword" placeholder="Password *" onBlur={this.handleBlur} onChange={this.handleChange} />
						<span className="form__field-description">Minimum 6 characters</span>
						<label htmlFor="mafPasswordConfirmation">Password confirmation</label>
						<input type="password" name="mafPasswordConfirmation" id="mafPasswordConfirmation" placeholder="Password confirmation *" onBlur={this.handleBlur} onChange={this.handleChange} />
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
