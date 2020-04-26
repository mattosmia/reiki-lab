import React from 'react';

import { countryAlpha3ToName } from './__Utils';

function AdminDistanceHealingReportRow(props) {
	return (
		<tr>
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
				<span>{props.data.volunteer}</span>
			</td>
		</tr>
	);
}

export default AdminDistanceHealingReportRow;
