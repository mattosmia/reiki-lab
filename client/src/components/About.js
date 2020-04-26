import React from 'react';
import { Link } from 'react-router-dom';

import ContentPage from './_ContentPage';
import TextWithButton from './_TextWithButton';
import ContactForm from './_ContactForm';

import contentImage from '../images/07-about-us.png';

const contentCopy = <>
	<p>In June 2018, the non-profit project called Reiki Lab was born from the desire to make the Reiki technique feasible for anyone who wanted to experience it, not just for those who could pay for individual sessions. In addition to providing a wonderful opportunity for Reiki practitioners to develop the technique, feel confident in 1 to 1 session, exchange feedbacks, knowledge and most importantly love.</p>
	<p>This dream, which started with Danieli Rangel's previous experience in similar projects in Brazil, only became reality through the insistence and commitment of a group of 6 volunteers, who rolled up their sleeves and made everything happen.</p>
	<p>Since then, many volunteers have joined the Lab, each one bringing more wisdom, commitment and above all love, adding to our existence as individuals and strengthening the energy of the group.</p>
	<p>Hundreds of people have already been assisted in this work that takes place in “Portal Caminho do Meio” premises on 36 North Great George’s street every Sunday morning. A work built on love, surrender, devotion, humility, gratitude and constant learning.</p>
	<p>Gratitude!</p>
	<ul className="link-list unstyled-list">
		<li><Link to="/what-is-reiki">What is Reiki?</Link></li>
		<li><Link to="/volunteers">Meet Our Volunteers</Link></li>
	</ul>
</>;

function About() {
	return (
		<>
			<ContentPage heading="About us" subheading="Volunteers energy healers in Dublin" image={contentImage} imageAltText="Our team of volunteers" content={contentCopy} />
			<TextWithButton />
			<ContactForm />
		</>
	);
}

export default About;
