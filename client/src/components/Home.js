import React from 'react';

import Axios from "axios";

import Hero from './_Hero';
import ThreeColumns from './_ThreeColumns';
import ContactForm from './_ContactForm';
import TextWithButton from './_TextWithButton';

function Home() {
	return (
		<>
			<Hero />
			<ThreeColumns />
			<TextWithButton />
			<ContactForm />
		</>
	);
}

export default Home;
