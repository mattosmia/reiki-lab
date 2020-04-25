import React from 'react';

import Axios from "axios";

import Hero from './_Hero';
import ThreeColumns from './_ThreeColumns';
import ContactForm from './_ContactForm';
import TextWithButton from './_TextWithButton';

function Home() {
	Axios({
		method: "GET",
		url: "http://localhost:5000/",
		headers: {
		  "Content-Type": "application/json"
		}
	  }).then(res => {
		console.log(res.data.message);
	  });
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
