import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CookieNotice extends Component {
	constructor(props) {
		super(props);
		this.state = {
			acceptedCookies: false
		}
	}

	checkAcceptedCookies = () => {
		this.setState({ acceptedCookies: false });
	}

	setAcceptedCookies = () => {
		this.setState({ acceptedCookies: true });
	}

	componentDidMount() {
		this.checkAcceptedCookies();
	}

	render() {
		return (
			<>
			{! this.state.acceptedCookies && <section className="cookie-notice">
				<div className="wrapper wrapper--narrow">
					<div>To support your privacy rights our new Privacy Policy describes our use and sharing of cookies with our social media, advertising & analytics partners. We recommend that you review the privacy policy <Link to="/privacy-policy">here</Link>, and follow the instructions to modify your cookie settings to suit your privacy preferences. Continued use of our site confirms your choice to accept our privacy policy and confirms your agreement to the processing of your personal data in line with our policy and your preferences. <Link to="/cookie-policy">Read Cookie Policy</Link></div>
					<button className="btn" onClick={this.setAcceptedCookies}>Accept</button>
				</div>
			</section>}
			</>
		);
	}
}

export default CookieNotice;
