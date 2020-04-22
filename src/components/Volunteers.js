import React from 'react';

import VolunteersList from './_VolunteersList';
import ContactForm from './_ContactForm';
import TextWithButton from './_TextWithButton';

function Volunteers() {
	return (
		<>
			<VolunteersList />
			<TextWithButton />
			<ContactForm />
		</>
	);
}

export default Volunteers;
