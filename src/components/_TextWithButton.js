import React from 'react';
import { Link } from 'react-router-dom';

function TextWithButton() {
  return (
	<section className="text-with-button">
		<div className="wrapper wrapper--narrow">
			<h1 className="module-heading">Reiki session</h1>
			<p>Would you like to receive a presencial healing?<br />
			Have a look on our next events or send us a message with your details.</p>
			<Link to="/events" className="btn btn--secondary">Next events</Link>
		</div>
	</section>
  );
}

export default TextWithButton;
