import React from 'react';
import { Link } from 'react-router-dom';

import ContentPage from './_ContentPage';
import DistanceHealingForm from './_DistanceHealingForm';
import TextWithButton from './_TextWithButton';
import ContactForm from './_ContactForm';

import contentImage from '../images/08-distance-healing.png';

const contentCopy = <>
	<p>Distance healing sections are being held every Sunday Morning from 11.00 AM to 12.00 PM Dublin time.</p>
	<p>During the section try to look for a quiet place, play calm music, relax your mind and enjoy the flow of the Reiki energy.</p>
	<p>Subscriptions will be held in our databases for a maximum of four weeks, therefore we advise everyone to subscribe to the sessions again every first day of a new month.</p>
	<ul className="link-list unstyled-list">
		<li><a href="https://www.eventbrite.com/o/reiki-lab-29215302519" target="_blank" rel="noopener noreferrer">For more information about our Reiki Sections, please visit our Events page.</a></li>
	</ul>
</>;

function DistanceHealing() {
	return (
		<>
			<ContentPage heading="Distance healing" subheading="Please, fill in the form below if you'd like to receive loads of positive love energy from us" image={contentImage} imageAltText="Universal life force energy" content={contentCopy} />
			<DistanceHealingForm />
			<TextWithButton />
			<ContactForm />
		</>
	);
}

export default DistanceHealing;
