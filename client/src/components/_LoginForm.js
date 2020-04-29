import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from "axios";
import cookie from 'react-cookies';

import FormValidation from './__FormValidation';
import Loading from './__Loading';
import { isAuthenticated } from './__Utils';

class LoginForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			formSubmitted: false,
			requestError: false,
			requestSuccess: false,
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
		isAuthenticated().then(user => {
			if (Object.keys(user).length) {
				this.props.history.push('/my-account');
			} else {
				let obj = {};
				for (let fieldName of Object.keys(this.state.formFieldValid)) {
					obj = {...obj, ...FormValidation(fieldName, this.state.formFieldValues) }
				}
				this.setValidateFields(obj);
				this.setState({ loading: false }, () => this.props.setAuth(user))
			}
		})
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
			axios.post('/login', this.state.formFieldValues)
			.then(res => {
				cookie.save('rljwt', res.data, { path: '/' });
				this.setState({
					loading: false,
					requestSuccess: true
				}, () => this.props.history.push('/my-account'))
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
			<section className="login-form">
				<div className="wrapper">
					<h1 className="module-heading module-heading--pink">Log in</h1>
					{ this.state.loading && <Loading />}
					{ ! this.state.loading && <>
					<p>Please, enter your details below or <Link to="/register">sign up</Link></p>
					<form noValidate className="form">
						{this.state.requestError && <p className="error-message">Please verify your details and try again</p>}
						<label htmlFor="lfEmail">Email</label>
						<input type="email" name="lfEmail" id="lfEmail" placeholder="Email" onChange={this.handleChange} />
						<label htmlFor="lfPassword">Password</label>
						<input type="password" name="lfPassword" id="lfPassword" placeholder="Password" onChange={this.handleChange} />
						<button type="button" className={`btn btn--secondary${this.state.formSubmitted? ' btn--waiting': ''}`} disabled={!this.state.formValid || this.state.formSubmitted} onClick={this.submitForm}>Log in</button>
						<p className="small"><Link to="/forgot-password">Forgotten password?</Link></p>
					</form>
					</>}
				</div>
			</section>
		);
	}
}

export default withRouter(LoginForm);
