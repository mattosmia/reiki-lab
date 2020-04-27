import React from 'react';

import LoginForm from './_LoginForm';
import ContactForm from './_ContactForm';
import TextWithButton from './_TextWithButton';

function Login(props) {
	return (
		<>
			<LoginForm {...props} />
			<TextWithButton />
			<ContactForm />
		</>
	);
}

export default Login;
