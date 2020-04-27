import React from 'react';

import {withRouter} from 'react-router-dom';
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

export default withRouter(Login);
