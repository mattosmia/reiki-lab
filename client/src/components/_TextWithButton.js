import React from 'react';

function TextWithButton() {
  return (
	<section className="text-with-button">
		<div className="wrapper wrapper--narrower">
			<h1 className="module-heading">Reiki session</h1>
			<p>Would you like to receive a presencial healing?<br />
			Have a look on our next events or send us a message with your details.</p>
			<a href="https://www.eventbrite.com/o/reiki-lab-29215302519" className="btn btn--secondary" target="_blank" rel="noopener noreferrer">Next events</a>
		</div>
	</section>
  );
}

export default TextWithButton;
