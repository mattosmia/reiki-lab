import React from 'react';

import ResetPasswordForm from './_ResetPasswordForm';
import ContactForm from './_ContactForm';
import TextWithButton from './_TextWithButton';

function ResetPassword(props) {
	return (
		<>	
			<ResetPasswordForm emailKey={props.match.params.id} />
			<TextWithButton />
			<ContactForm />
		</>
	);
}

export default ResetPassword;
