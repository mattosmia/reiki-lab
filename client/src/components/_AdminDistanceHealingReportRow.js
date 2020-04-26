import React from 'react';

import { countryAlpha3ToName } from './__Utils';

function AdminDistanceHealingReportRow(props) {
	const countryRes = countryAlpha3ToName(props.data.residence);
	return (
		<tr>
			<td>
				{props.data.first_name} {props.data.last_name}
			</td>
			<td>
				{props.data.dob}
			</td>
			<td>
				{countryRes}
			</td>
			<td>
				{props.data.date}
			</td>
		</tr>
	);
}

export default AdminDistanceHealingReportRow;
