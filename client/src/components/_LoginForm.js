import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

import FormValidation from './__FormValidation';

class LoginForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			formSubmitted: false,
			formSubmitError: false,
			formSubmitSuccess: false,
			formValid: false,
			formFieldValid: {
				'lfEmail': false,
				'lfPassword': false
			},
			formFieldValues: {
				'lfEmail': '',
				'lfPassword': ''
			}
		}
	}

	componentDidMount() {
		let obj = {};
		for (let fieldName of Object.keys(this.state.formFieldValid)) {
			obj = {...obj, ...FormValidation(fieldName, this.state.formFieldValues) }
		}
		this.setValidateFields(obj);
	}

	checkFormValid = () => { 
		this.setState({ formValid: ! Object.values(this.state.formFieldValid).includes(false) });
	}

	handleChange = (e) => {
		e.persist();
		const fieldName = e.target.name;
		const fieldValue = e.target.value;
		
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
			axios.post('/login', this.state.formFieldValues)
			.then(res => {
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
			<section className="login-form">
				<div className="wrapper">
					<h1 className="module-heading module-heading--pink">Log in</h1>
					<p>Please, enter your details below or <Link to="/register">sign up</Link></p>
					<form noValidate className="form" method="POST">
						<label htmlFor="lfEmail">Email</label>
						<input type="email" name="lfEmail" id="lfEmail" placeholder="Email" onChange={this.handleChange} />
						<label htmlFor="lfPassword">Password</label>
						<input type="password" name="lfPassword" id="lfPassword" placeholder="Password" onChange={this.handleChange} />
						<button type="button" className={`btn btn--secondary${this.state.formSubmitted? ' btn--waiting': ''}`} disabled={!this.state.formValid || this.state.formSubmitted} onClick={this.submitForm}>Log in</button>
						<p className="small"><Link to="/forgot-password">Forgotten password?</Link></p>
					</form>
				</div>
			</section>
		);
	}
}

export default LoginForm;
