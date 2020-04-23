import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class RegistrationForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			checkboxVolunteer: false,
			formErrors: {},
			formValues: {}
		}
	}

	setIsVolunteer = (e) => this.setState({checkboxVolunteer: e.target.checked});

	validateRegistrationForm = (e) => {
		this.setState({
			formValues: {...this.state.formValues, [e.target.name]: e.target.value}
		}, () => {
			if (
				(e.target.value === '') ||
				(e.target.name === 'rfDOB' && ! e.target.value.match(/^(?:(?:31\/(?:0[13578]|1[02]))\/|(?:(?:29|30)\/(?:0[13-9]|1[0-2])\/))(?:(?:19|20)\d{2})$|^(?:29\/02\/(?:(?:(?:19|20)(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0[1-9]|1\d|2[0-8])\/(?:(?:0[1-9])|(?:1[0-2]))\/(?:(?:19|20)\d{2})$/)) ||
				(e.target.name === 'rfEmail' && ! e.target.value.match(/^[a-z0-9_.-]+@[a-z0-9_.-]+\.[a-z]{2,}$/i)) ||
				(e.target.name === 'rfEmailConfirmation' && (! e.target.value.match(/^[a-z0-9_.-]+@[a-z0-9_.-]+\.[a-z]{2,}$/i || this.state.formValues.rfEmail !== e.target.value)))
			) {
				this.setState({
					formErrors: {...this.state.formErrors, [e.target.name]: true}
				})
			} else if (this.state.formErrors[e.target.name]) {
				this.setState({
					formErrors: {...this.state.formErrors, [e.target.name]: false}
				})
			}
		})
	}

	render () {
		return (
			<section className="registration-form">
				<div className="wrapper">
					<h1 className="module-heading module-heading--pink">Sign up</h1>
					<p>Create your account or <Link to="/login">Log in</Link></p>
					<form className="form" method="POST" noValidate>
						<label htmlFor="rfFirstName">First name</label>
						<input type="text" name="rfFirstName" id="rfFirstName" placeholder="First name" className={this.state.formErrors.rfFirstName? 'error' : ''} onChange={this.validateRegistrationForm} />
						<label htmlFor="rfLastName">Last name</label>
						<input type="text" name="rfLastName" id="rfLastName" placeholder="Last name" className={this.state.formErrors.rfLastName? 'error' : ''} onChange={this.validateRegistrationForm} />
						<label htmlFor="rfDOB">Date of Birth</label>
						<input type="text" name="rfDOB" id="rfDOB" placeholder="Date of Birth" className={this.state.formErrors.rfDOB? 'error' : ''} onChange={this.validateRegistrationForm} />
						<label htmlFor="rfNationality">Nationality</label>
						<input type="text" name="rfNationality" id="rfNationality" placeholder="Nationality" className={this.state.formErrors.rfNationality? 'error' : ''} onChange={this.validateRegistrationForm} />
						<label htmlFor="rfCountryRes">Country of Residence</label>
						<input type="text" name="rfCountryRes" id="rfCountryRes" placeholder="Country of Residence" className={this.state.formErrors.rfCountryRes? 'error' : ''} onChange={this.validateRegistrationForm} />
						<label htmlFor="rfEmail">Email</label>
						<input type="email" name="rfEmail" id="rfEmail" placeholder="Email" className={this.state.formErrors.rfEmail? 'error' : ''} onChange={this.validateRegistrationForm} />
						<label htmlFor="rfEmailConfirmation">Email Confirmation</label>
						<input type="email" name="rfEmailConfirmation" id="rfEmailConfirmation" placeholder="Email Confirmation" className={this.state.formErrors.rfEmailConfirmation? 'error' : ''} onChange={this.validateRegistrationForm} />
						<label htmlFor="rfPassword">Password</label>
						<input type="password" name="rfPassword" id="rfPassword" placeholder="Password" className={this.state.formErrors.rfPassword? 'error' : ''} onChange={this.validateRegistrationForm} />
						<label htmlFor="rfPasswordConfirmation">Password Confirmation</label>
						<input type="password" name="rfPasswordConfirmation" id="rfPasswordConfirmation" placeholder="Password Confirmation" className={this.state.formErrors.rfPasswordConfirmation? 'error' : ''} onChange={this.validateRegistrationForm} />
						<input type="checkbox" id="rfVolunteer" name="rfVolunteer" onChange={this.setIsVolunteer} /><label className="inline-label" htmlFor="rfVolunteer">I'd like to be a volunteer</label>
						{this.state.checkboxVolunteer && 
						<>
							<label htmlFor="rfFacebook">Facebook URL</label>
							<input type="text" name="rfFacebook" id="rfFacebook" placeholder="Facebook URL" />
							<label htmlFor="rfInstagram">Instagram URL</label>
							<input type="text" name="rfInstagram" id="rfInstagram" placeholder="Instagram URL" />
							<label htmlFor="rfTherapies">Therapies</label>
							<input type="text" name="rfTherapies" id="rfTherapies" placeholder="Therapies" />
						</>}
						<input type="checkbox" id="rfTerms" name="rfTerms" /><label className="inline-label" htmlFor="rfTerms">I agree with the Terms & Conditions</label>
						<button type="button" className="btn btn--secondary" disabled={true}>Create account</button>
					</form>
				</div>
			</section>
		);
	}
}

export default RegistrationForm;
