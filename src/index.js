import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import * as serviceWorker from './serviceWorker';

import './styles/global.scss';

import Header from './components/_Header';
import Footer from './components/_Footer';
import Home from './components/Home';
import About from './components/About';
import AboutReiki from './components/AboutReiki';
import DistanceHealing from './components/DistanceHealing';
import Events from './components/Events';
import Volunteers from './components/Volunteers';
import Contact from './components/Contact';
import Login from './components/Login';
import Register from './components/Register';
import TermsConditions from './components/TermsConditions';
import PrivacyPolicy from './components/PrivacyPolicy';
import CookiePolicy from './components/CookiePolicy';
import CookieNotice from './components/_CookieNotice';

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
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
					<Route exact path="/login" component={Login} />
					<Route exact path="/register" component={Register} />
					<Route exact path="/terms-conditions" component={TermsConditions} />
					<Route exact path="/privacy-policy" component={PrivacyPolicy} />
					<Route exact path="/cookie-policy" component={CookiePolicy} />
				</Switch>
			</main>
			<Footer />
			<CookieNotice />
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);

serviceWorker.register();
