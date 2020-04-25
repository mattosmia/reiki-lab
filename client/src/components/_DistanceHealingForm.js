import React, { Component } from 'react';

class DistanceHealingForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			formErrors: {},
			formValues: {}
		}
	}

	render () {
		return (
			<section className="distance-healing-form">
				<div className="wrapper">
					<form noValidate className="form" method="POST">
						<label htmlFor="dhfFullName">Full name</label>
						<input type="text" name="dhfFullName" id="dhfFullName" placeholder="Full name" className={this.state.formErrors.dhfFullName? 'error' : ''} />
						<label htmlFor="dhfDOB">Date of Birth</label>
						<input type="text" name="dhfDOB" id="dhfDOB" placeholder="Date of Birth" className={this.state.formErrors.dhfDOB? 'error' : ''} />
						<label htmlFor="dhfCountryRes">Country of Residence</label>
						<input type="text" name="dhfCountryRes" id="dhfCountryRes" placeholder="Country of Residence" className={this.state.formErrors.dhfCountryRes? 'error' : ''}  />
						<input type="checkbox" id="dhfConfirm" name="dhfConfirm" /><label className="inline-label" htmlFor="dhfConfirm">Please, place me on this month's distance healing list</label>
						<input type="checkbox" id="dhfTerms" name="dhfTerms" /><label className="inline-label" htmlFor="dhfTerms">I agree with the Terms & Conditions</label>
						<button type="button" className="btn btn--secondary" disabled={true}>Add me to the list</button>
					</form>
				</div>
			</section>
		);
	}
}

export default DistanceHealingForm;
