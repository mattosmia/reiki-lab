import React from 'react';
import { Link } from 'react-router-dom';

import ContentPage from './_ContentPage';
import TextWithButton from './_TextWithButton';
import ContactForm from './_ContactForm';

import contentImage from '../images/03-what-is-reiki.jpg';

const contentCopy = <>
	<p>Reiki is a therapy that promotes wellbeing by bringing our mind and body into a state of equilibrium. It is well known that over 90% of our physical problems are merely symptomatic. Which means that our mind is responsible to create almost all diseases that we come across today. The 10% remaining is most likely caused by virus, bacteria or other kind of parasites.</p>
	<p>According to the eastern medicine, the human being is not just a bunch of cells organised in specialised tissues and organs. We are light bodies that possesses the ability to absorb the energy that surround us, and this energy is mainly absorbed by our energy centres, commonly known as chakras.</p>
	<p>The point where eastern and western medicine entwines is where our endocrinal system is concerned our main energy centres are connected to crucial endocrinal glands and if they receive only good or qualified energy, we have a perfect pharmacy working 24/7.</p>
	<p>As it was previously stated our mind is responsible to create 90% of the diseases we know off, therefore, a good nutrition and physical exercises are only partially responsible for keeping our bodies healthy during our natural aging process.</p>
	<p>Reiki is considered a transmutational therapy it changes energy patterns, from a disqualified to a qualified one. The technique promotes the balance between the energies yin and yang or, in western language, cold and warm. Our proteins need an optimum temperature to work, and the hormones produced by our endocrinal glands are basically proteins. As a result, thermal imbalance may influence in our hormones. Furthermore, apart from being considered a holistic therapy, Reiki is also considered an eastern philosophy and it is based on 5 principles:</p>
	<p className="color--blue">1. Just for today, I will be grateful<br />
	2. Just for today, I won't get angry<br />
	3. Just for today, I won't worry<br />
	4. Just for today, I will do my work honestly<br />
	5. Just for today, I will be kind to every living thing<br />
	Dr. Mikao Usui Ryoho (Founder of the original Usui Reiki Method)</p>
	<p>These principles aim to help people to keep their thoughts, feeling and words in a qualified vibrational pattern, enabling the perfect functioning of their chakras and consequently the secretion of all hormones when needed and in the right quantities.</p>
	<p>All things considered, it is of pivotal importance that we keep our mind as strong as our bodies in order to ensure a healthy longevity and that’s where the Reiki technique can be of great help.</p>
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
