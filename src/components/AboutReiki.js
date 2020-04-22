import React from 'react';
import { Link } from 'react-router-dom';

import ContentPage from './_ContentPage';
import TextWithButton from './_TextWithButton';
import ContactForm from './_ContactForm';

import contentImage from '../images/03-what-is-reiki.jpg';

const contentCopy = <>
	<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
	<p><span className="color--blue">The 5 Reiki Principles</span><br />
	Just for today:<br />
	Do not worry<br />
	Do not be angry<br />
	Work honestly<br />
	Be grateful<br />
	Be kind to yourself and all living things</p>

	<ul className="link-list unstyled-list">
		<li><Link to="/about">About Us</Link></li>
		<li><Link to="/volunteers">Meet Our Volunteers</Link></li>
	</ul>
</>;

function AboutReiki() {
	return (
		<>
			<ContentPage heading="What is Reiki?" subheading="Universal life force energy" image={contentImage} imageAltText="Universal life force energy" content={contentCopy} />
			<TextWithButton />
			<ContactForm />
		</>
	);
}

export default AboutReiki;
