import React from 'react';

import LoginForm from './_LoginForm';
import ContactForm from './_ContactForm';
import TextWithButton from './_TextWithButton';

function Logout() {
	return (
		<>
			<p>You have successfully logged out.</p>
			<LoginForm />
			<TextWithButton />
			<ContactForm />
		</>
	);
}

export default Logout;
