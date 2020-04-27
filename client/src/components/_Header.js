import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import logo from '../images/01-reiki-lab_logo-type-white.svg';

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoggedIn: {}
		}
	}
	componentDidMount() {
		this.setState({
			isLoggedIn: this.props.user
		})
	}

	componentDidUpdate(prevState, prevProps) {
		if (this.state.isLoggedIn !== this.props.user) {
			this.setState({
				isLoggedIn: this.props.user
			});
		}
	}
	render() {
		return (
			<header>
				<div className="header__top">
					<div className="wrapper">
						<Link to="/"><img src={logo} alt="Reiki Lab" /></Link>
						<nav className="header__account-buttons">
							{ this.state.isLoggedIn.uid ? <>
							<Link to="/my-account" className="btn">My Account</Link>
							<Link to="/logout" className="btn btn--secondary">Log Out</Link>
							</> : <>
							<Link to="/login" className="btn">Login</Link>
							<Link to="/register" className="btn btn--secondary">Sign Up</Link>
							</>}
						</nav>
					</div>
				</div>
				<div className="header__logo cover-link">
					<Link to="/"><span>Go Home</span></Link>
				</div>
				<div className="header__main-nav">
					<nav className="wrapper wrapper--padded-small">
						<ul className="unstyled-list">
							<li><Link to="/about">About Us</Link></li>
							<li><Link to="/distance-healing">Distance Healing</Link></li>
							<li><a href="https://www.eventbrite.com/o/reiki-lab-29215302519" target="_blank" rel="noopener noreferrer">Events</a></li>
							<li><Link to="/volunteers">Volunteers</Link></li>
							<li><Link to="/contact">Contact Us</Link></li>
						</ul>
					</nav>
				</div>
			</header>
		);
	}
}

export default Header;
