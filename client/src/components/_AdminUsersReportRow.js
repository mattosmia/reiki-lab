import React from 'react';

import { countryAlpha3ToName } from './__Utils';

function AdminDistanceHealingReportRow(props) {
	return (
		<tr className={props.data.volunteer === 'Y' && ! props.data.approval_date ? 'need-approval' : ''}>
			<td>
				{props.data.first_name} {props.data.last_name}
			</td>
			<td>
				{props.data.email}
			</td>
			<td>
				{props.data.dob}
			</td>
			<td>
				{countryAlpha3ToName(props.data.residence)}
			</td>
			<td>
				{countryAlpha3ToName(props.data.nationality)}
			</td>
			<td>
				{props.data.registration_date}
			</td>
			<td>
				{props.data.volunteer === 'Y'? (props.data.approval_date? 'Yes' : 'Approve?') : 'No'}
			</td>
		</tr>
	);
}

export default AdminDistanceHealingReportRow;
