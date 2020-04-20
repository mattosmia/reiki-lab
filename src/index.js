import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter, Route } from "react-router-dom";
import * as serviceWorker from './serviceWorker';

import './styles/styles.scss';

import Header from './components/_Header';
import Footer from './components/_Footer';
import Home from './components/Home';
import About from './components/About';
import DistanceHealing from './components/DistanceHealing';
import Events from './components/Events';
import Volunteers from './components/Volunteers';
import Contact from './components/Contact';
import Login from './components/Login';
import Register from './components/Register';
import TermsConditions from './components/TermsConditions';
import PrivacyPolicy from './components/PrivacyPolicy';
import CookiePolicy from './components/CookiePolicy';

ReactDOM.render(
	<React.StrictMode>
		<MemoryRouter initialEntries={["/"]} initialIndex={0}>
			<Header />
			<main>
				<Route exact path="/" component={Home} />
				<Route exact path="/about" component={About} />
				<Route exact path="/distance-healing" component={DistanceHealing} />
				<Route exact path="/events" component={Events} />
				<Route exact path="/volunteers" component={Volunteers} />
				<Route exact path="/contact" component={Contact} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/register" component={Register} />
				<Route exact path="/terms-conditions" component={TermsConditions} />
				<Route exact path="/privacy-policy" component={PrivacyPolicy} />
				<Route exact path="/cookie-policy" component={CookiePolicy} />
			</main>
			<Footer />
		</MemoryRouter>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
