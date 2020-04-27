import React, { Component } from 'react';
import axios from "axios";

import LoginForm from './_LoginForm';
import ContactForm from './_ContactForm';
import TextWithButton from './_TextWithButton';
import Loading from './__Loading';

class Logout extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			logoutError: false,
			logoutSuccess: false
		}
	}

	componentDidMount() {
		axios.post('/logout', this.state.formFieldValues)
			.then(res => {
				this.setState({
					loading: false,
					logoutSuccess: true
				},() => this.props.history.push({pathname: '/login'}))
			}).catch(error => 
				this.setState({
					loading: false,
					logoutError: true
				})
			);
	}

	render() {
		return (
			<>
				{ this.state.loading && <Loading /> }
				{ ! this.state.loading && this.state.logoutSuccess && <>
					<p>You have successfully logged out.</p>
					<LoginForm />
					<TextWithButton />
					<ContactForm />
				</>}
				{ ! this.state.loading && this.state.logoutError && <>
					<p>There has been an error. Please try again later</p>
					<TextWithButton />
					<ContactForm />
				</>}
			</>
		);
	}
}

export default Logout;
