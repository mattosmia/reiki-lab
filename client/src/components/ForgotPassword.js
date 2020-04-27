import React from 'react';

import ForgotPasswordForm from './_ForgotPasswordForm';
import ContactForm from './_ContactForm';
import TextWithButton from './_TextWithButton';

function ForgotPassword(props) {
	return (
		<>
			<ForgotPasswordForm />
			<TextWithButton />
			<ContactForm />
		</>
	);
}

export default ForgotPassword;
