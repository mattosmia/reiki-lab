import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import '../styles/global.scss';

import Header from './_Header';
import Footer from './_Footer';
import Home from './Home';
import About from './About';
import AboutReiki from './AboutReiki';
import DistanceHealing from './DistanceHealing';
import Events from './Events';
import Volunteers from './Volunteers';
import Contact from './Contact';
import Login from './Login';
import Register from './Register';
import TermsConditions from './TermsConditions';
import PrivacyPolicy from './PrivacyPolicy';
import CookiePolicy from './CookiePolicy';
import CookieNotice from './_CookieNotice';
import ScrollToTop from './__ScrollToTop';

import Admin from './Admin';
import MyAccount from './MyAccount';
import Logout from './Logout';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import { isAuthenticated } from './__Utils';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {}
		}
		this.setAuth = this.setAuth.bind(this);
	}

	componentDidMount() {
		isAuthenticated().then(user => {
			this.setAuth(user);
		})
	}

	setAuth = (user) => {
		this.setState({user})
	}

	render() {
		return (
		<BrowserRouter>
			<ScrollToTop />
			{ this.state.user && <Header user={this.state.user} setAuth={this.setAuth} {...this.props} />}}
			<main>
				<Switch>
					{/* Content pages */}
					<Route exact path="/" render={() => <Home setAuth={this.setAuth} {...this.props} />} />
					<Route exact path="/about" render={() => <About setAuth={this.setAuth} {...this.props} />} />
					<Route exact path="/contact" render={() => <Contact setAuth={this.setAuth} {...this.props} />} />
					<Route exact path="/distance-healing" render={() => <DistanceHealing setAuth={this.setAuth} {...this.props} />} />
					<Route exact path="/events" render={() => <Events setAuth={this.setAuth} {...this.props} />} />
					<Route exact path="/volunteers" render={() => <Volunteers setAuth={this.setAuth} {...this.props} />} />
					<Route exact path="/what-is-reiki" render={() => <AboutReiki setAuth={this.setAuth} {...this.props} />} />

					{/* Account pages -- non restricted routes */}
					<Route exact path="/login" render={() => <Login setAuth={this.setAuth} {...this.props} />} />
					<Route exact path="/forgot-password" render={() => <ForgotPassword setAuth={this.setAuth} {...this.props} />} />
					<Route exact path="/logout" render={() => <Logout setAuth={this.setAuth} {...this.props} />} />
					<Route exact path="/register" render={() => <Register setAuth={this.setAuth} {...this.props} />} />
					<Route exact path="/reset-password/:id" render={() => <ResetPassword setAuth={this.setAuth} {...this.props} />} />

					{/* Account pages -- restricted routes */}
					<Route exact path="/admin" render={() => <Admin setAuth={this.setAuth} {...this.props} />} />
					<Route exact path="/my-account" render={() => <MyAccount setAuth={this.setAuth} {...this.props} />} />

					{/* Terms content pages */}
					<Route exact path="/cookie-policy" render={() => <CookiePolicy setAuth={this.setAuth} {...this.props} />} />
					<Route exact path="/terms-conditions" render={() => <TermsConditions setAuth={this.setAuth} {...this.props} />} />
					<Route exact path="/privacy-policy" render={() => <PrivacyPolicy setAuth={this.setAuth} {...this.props} />} />
				</Switch>
			</main>
			<Footer />
			<CookieNotice />
		</BrowserRouter>
		);
}}

export default App;