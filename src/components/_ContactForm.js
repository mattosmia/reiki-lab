import React from 'react';

import envelope from '../images/04-envelope.svg';

function ContactForm() {
  return (
	<section className="contact-form">
		<div className="wrapper">
			<h1 className="module-heading">Get in touch</h1>
			<form className="form" method="POST">
				<img className="contact-form__icon" src={envelope} alt="Contact form" />
				<label htmlFor="cfName">Full name</label>
				<input type="text" name="cfName" id="cfName" placeholder="Full name" />
				<label htmlFor="cfEmail">Email address</label>
				<input type="email" name="cfEmail" id="cfEmail" placeholder="Email address" />
				<label htmlFor="cfSubject">Subject</label>
				<input type="text" name="cfSubject" id="cfSubject" placeholder="Subject" />
				<label htmlFor="cfMessage">Message</label>
				<textarea name="cfMessage" id="cfMessage" placeholder="Message"></textarea>
				<button className="btn btn--secondary">Send message</button>
			</form>
		</div>
	</section>
  );
}

export default ContactForm;
