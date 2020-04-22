import React from 'react';
import { Link } from 'react-router-dom';

import ContentPage from './_ContentPage';
import TextWithButton from './_TextWithButton';
import ContactForm from './_ContactForm';

import contentImage from '../images/07-about-us.png';

const contentCopy = <>
	<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
	<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
	<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
	<p>Namaste!</p>
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
