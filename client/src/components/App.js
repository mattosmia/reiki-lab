import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

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

import { isAuthenticated } from './__Utils';
import Admin from './Admin';
import MyAccount from './MyAccount';
import Logout from './Logout';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';

const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route {...rest} render={props => (
		! isAuthenticated() ?
			// not authenticated - redirect to log in
			<Redirect to={{
				pathname: '/login',
				state: { from: props.location } }}
			/>
			:
			<Component {...props} />
	)} />
)

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			logoutError: false,
			logoutSuccess: false
		}
	}

	render() {
		return (
		<BrowserRouter withRouter>
			<ScrollToTop />
			<Header />
			<main>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/about" component={About} />
					<Route exact path="/distance-healing" component={DistanceHealing} />
					<Route exact path="/events" component={Events} />
					<Route exact path="/volunteers" component={Volunteers} />
					<Route exact path="/what-is-reiki" component={AboutReiki} />
					<Route exact path="/contact" component={Contact} />
					<Route exact path="/register" component={Register} />
					<Route exact path="/terms-conditions" component={TermsConditions} />
					<Route exact path="/privacy-policy" component={PrivacyPolicy} />
					<Route exact path="/cookie-policy" component={CookiePolicy} />

					<Route exact path="/forgot-password" component={ForgotPassword} />

					<Route exact path="/reset-password/:id" component={ResetPassword} />

					<Route exact path="/login" component={Login} />

					<PrivateRoute exact path="/admin" component={Admin} />
					<PrivateRoute exact path="/my-account" component={MyAccount} />
					<PrivateRoute exact path="/logout" component={Logout} />
				</Switch>
			</main>
			<Footer />
			<CookieNotice />
		</BrowserRouter>
		);
	}
}

export default App;
