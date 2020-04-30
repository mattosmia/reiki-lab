import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../images/05-reiki-lab_logo-footer.svg';
import arrow from '../images/06-arrow-up.svg';

function Footer() {
	return (
		<footer className="wrapper wrapper--narrow">
			<nav className="footer__nav-top">
				<div className="footer__nav--logo">
					<Link to="/"><img src={logo} alt="Reiki Lab" /></Link>
				</div>
				<div className="footer__nav--social-media">
					<div>Follow us</div>
					<ul className="unstyled-list">
						<li><a href="https://www.facebook.com/reikilabdub/" className="icon icon__sm--facebook" target="_blank" rel="noopener noreferrer"><span className="vh">Facebook</span></a></li>
						<li><a href="https://www.instagram.com/reikilab/" className="icon icon__sm--instagram" target="_blank" rel="noopener noreferrer"><span className="vh">Instagram</span></a></li>
					</ul>
				</div>
				<div className="footer__nav-main">
					<ul className="footer__nav-main__list unstyled-list">
						<li><Link to="/">Home</Link></li>
						<li><Link to="/about">About Us</Link></li>
						<li><Link to="/distance-healing">Distance Healing</Link></li>
					</ul>
				</div>
				<div className="footer__nav-main">
					<ul className="footer__nav-main__list unstyled-list">
						<li><a href="https://www.eventbrite.com/o/reiki-lab-29215302519" target="_blank" rel="noopener noreferrer">Events</a></li>
						<li><Link to="/volunteers">Volunteers</Link></li>
						<li><Link to="/contact">Contact Us</Link></li>
					</ul>
				</div>
			</nav>
			<nav className="footer__nav-bottom">
				<div>
					&copy; 2020&nbsp;|&nbsp;
					<Link to="/terms-conditions">Terms &amp; Conditions</Link>&nbsp;|&nbsp;
					<Link to="/privacy-policy">Privacy Policy</Link>&nbsp;|&nbsp;
					<Link to="/cookie-policy">Cookie Policy</Link>
				</div>
				<a href="#top"><img src={arrow} alt="Go back to the top" /></a>
			</nav>
		</footer>
	);
}

export default Footer;
