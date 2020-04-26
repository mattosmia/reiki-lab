// Regular expression declarations
const nameRegex = /^[\w.' ]+$/i;
const emailRegex = /^([a-z0-9_.+-]+)@([a-z0-9.-]+)\.([a-z]{2,})$/i;
const dateRegex = /^(?:(?:31\/(?:0[13578]|1[02]))\/|(?:(?:29|30)\/(?:0[13-9]|1[0-2])\/))(?:(?:19|20)\d{2})$|^(?:29\/02\/(?:(?:(?:19|20)(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0[1-9]|1\d|2[0-8])\/(?:(?:0[1-9])|(?:1[0-2]))\/(?:(?:19|20)\d{2})$/;
const alpha3Regex = /^[a-z]{3}$/i;
const passwordRegex = /^.{6,}$/;

function FormValidation(fieldName,fieldValues) {
	const fieldValue = fieldValues[fieldName];
	switch (fieldName) {
		// REGISTRATION FORM - start
		case 'rfFirstName':
		case 'rfLastName':
		case 'dhfFullName':
			// required field, must follow name pattern
			return { [fieldName]: (fieldValue !== '' && nameRegex.test(fieldValue) === true)}
		case 'rfNationality':
		case 'rfCountryRes':
		case 'dhfCountryRes':
			// required field, must follow alpha 3 pattern (country)
			return { [fieldName]: (fieldValue !== '' && alpha3Regex.test(fieldValue) === true)}
		case 'rfDOB':
		case 'dhfDOB':
			// required field, must follow date pattern
			return { [fieldName]: (fieldValue !== '' && dateRegex.test(fieldValue) === true)}
		case 'rfEmail':
		case 'rfEmailConfirmation':
			// required field, must follow email pattern
			if (! (fieldValue !== '' && emailRegex.test(fieldValue) === true)) return { [fieldName]: false }
			// check if they match, set both as valid if so
			if (fieldValues['rfEmail'] === fieldValues['rfEmailConfirmation']) return { rfEmail: true, rfEmailConfirmation: true }
			return { [fieldName]: true }
		case 'rfPassword':
		case 'rfPasswordConfirmation':
			// required field, must be at least 6 characters long
			if (! (fieldValue !== '' && passwordRegex.test(fieldValue) === true)) return { [fieldName]: false }
			// check if they match, set both as valid if so
			if (fieldValues['rfPassword'] === fieldValues['rfPasswordConfirmation']) {
				return { rfPassword: true, rfPasswordConfirmation: true }
			}
			return { [fieldName]: false }
		case 'rfVolunteer':
		case 'rfTherapies':
			// if volunteer is ticked, therapies is required 
			// volunteer is never required
			return { rfVolunteer: true, rfTherapies: ((fieldValues['rfVolunteer'] === true && fieldValues['rfTherapies'] !== '') || fieldValues['rfVolunteer'] !== true) }
		case 'rfTerms':
		case 'dhfConfirmList':
		case 'dhfTerms':
			// user must tick terms
			return { [fieldName]: (fieldValue === true) }
		case 'lfEmail':
			// required field, must follow email pattern
			if (! (fieldValue !== '' && emailRegex.test(fieldValue) === true)) return { [fieldName]: false }
			return { [fieldName]: true }
		case 'lfPassword':
			// required field, must be at least 6 characters long
			if (! (fieldValue !== '' && passwordRegex.test(fieldValue) === true)) return { [fieldName]: false }
			return { [fieldName]: true }
		default:
			// any other field does not require validation
			return { [fieldName]: true }
	}
}

export default FormValidation;