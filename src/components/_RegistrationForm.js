import React from 'react';

function RegistrationForm() {
	return (
		<section className="registration-form">
			<div className="wrapper">
				<h1 className="module-heading module-heading--pink">Sign up</h1>
				<p>Create your account</p>
				<form className="form" method="POST">
					<label htmlFor="rfName">Full name</label>
					<input type="text" name="rfName" id="rfName" placeholder="Full name" />
					<label htmlFor="rfDOB">Date of Birth</label>
					<input type="text" name="rfDOB" id="rfDOB" placeholder="Date of Birth" />
					<label htmlFor="rfNationality">Nationality</label>
					<input type="text" name="rfNationality" id="rfNationality" placeholder="Nationality" />
					<label htmlFor="rfCountryRes">Country of Residency</label>
					<input type="text" name="rfCountryRes" id="rfCountryRes" placeholder="Country of Residency" />
					<label htmlFor="rfEmail">Email</label>
					<input type="email" name="rfEmail" id="rfEmail" placeholder="Email" />
					<label htmlFor="rfEmailConfirmation">Email Confirmation</label>
					<input type="email" name="rfEmailConfirmation" id="rfEmailConfirmation" placeholder="Email Confirmation" />
					<label htmlFor="rfPassword">Password</label>
					<input type="password" name="rfPassword" id="rfPassword" placeholder="Password" />
					<label htmlFor="rfPasswordConfirmation">Password Confirmation</label>
					<input type="password" name="rfPasswordConfirmation" id="rfPasswordConfirmation" placeholder="Password Confirmation" />
					<input type="checkbox" id="rfTerms" name="rfTerms" /><label className="inline-label" htmlFor="rfTerms">I agree with the Terms & Conditions</label>
					<button className="btn btn--secondary">Create account</button>
				</form>
			</div>
		</section>
	);
}

export default RegistrationForm;
