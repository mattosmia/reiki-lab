import React from 'react';

import LoginForm from './_LoginForm';
import ContactForm from './_ContactForm';
import TextWithButton from './_TextWithButton';

function Login() {
	return (
		<>
			<LoginForm />
			<TextWithButton />
			<ContactForm />
		</>
	);
}

export default Login;
