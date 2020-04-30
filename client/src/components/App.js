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
import NotFound from './NotFound';

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
					<Route exact path="/" render={(props) => <Home setAuth={this.setAuth} {...props} />} />
					<Route exact path="/about" render={(props) => <About setAuth={this.setAuth} {...props} />} />
					<Route exact path="/contact" render={(props) => <Contact setAuth={this.setAuth} {...props} />} />
					<Route exact path="/distance-healing" render={(props) => <DistanceHealing setAuth={this.setAuth} {...props} />} />
					<Route exact path="/events" render={(props) => <Events setAuth={this.setAuth} {...props} />} />
					<Route exact path="/volunteers" render={(props) => <Volunteers setAuth={this.setAuth} {...props} />} />
					<Route exact path="/what-is-reiki" render={(props) => <AboutReiki setAuth={this.setAuth} {...props} />} />

					{/* Account pages -- non restricted routes */}
					<Route exact path="/login" render={(props) => <Login setAuth={this.setAuth} {...props} />} />
					<Route exact path="/forgot-password" render={(props) => <ForgotPassword setAuth={this.setAuth} {...props} />} />
					<Route exact path="/logout" render={(props) => <Logout setAuth={this.setAuth} {...props} />} />
					<Route exact path="/register" render={(props) => <Register setAuth={this.setAuth} {...props} />} />
					<Route exact path="/reset-password/:id" render={(props) => <ResetPassword setAuth={this.setAuth} {...props} />} />

					{/* Account pages -- restricted routes */}
					<Route exact path="/admin" render={(props) => <Admin setAuth={this.setAuth} {...props} />} />
					<Route exact path="/my-account" render={(props) => <MyAccount setAuth={this.setAuth} {...props} />} />

					{/* Terms content pages */}
					<Route exact path="/cookie-policy" render={(props) => <CookiePolicy setAuth={this.setAuth} {...props} />} />
					<Route exact path="/terms-conditions" render={(props) => <TermsConditions setAuth={this.setAuth} {...props} />} />
					<Route exact path="/privacy-policy" render={(props) => <PrivacyPolicy setAuth={this.setAuth} {...props} />} />

					{/* 404 */}
					<Route component={NotFound} />
				</Switch>
			</main>
			<Footer />
			<CookieNotice />
		</BrowserRouter>
		);
}}

export default App;