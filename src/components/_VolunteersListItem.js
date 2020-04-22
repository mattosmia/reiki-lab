import React from 'react';

import placeholderPicture from '../images/profile1.png';

function VolunteersListItem(props) {
  return (
	<div className="volunteers-list__column">
		<div className="volunteers-list__picture">
			<img
				src={props.data.image? props.data.image : placeholderPicture}
				alt={`Profile of ${props.data.firstName} ${props.data.lastName}`} />
		</div>
		<div className="volunteers-list__contact">
			{props.data.email && <a href={props.data.email} className="icon icon__contact--email"><span>Email</span></a>}
			{props.data.facebook && <a href={props.data.facebook} className="icon icon__contact--facebook"><span>Facebook</span></a>}
			{props.data.instagram && <a href={props.data.instagram} className="icon icon__contact--instagram"><span>Instagram</span></a>}
		</div>
		<div className="volunteers-list__name">
			{props.data.firstName} {props.data.lastName}
		</div>
		<div className="volunteers-list__therapies">
			{props.data.therapies}
		</div>
	</div>
  );
}

export default VolunteersListItem;
