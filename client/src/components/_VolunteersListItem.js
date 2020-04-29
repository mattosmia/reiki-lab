import React from 'react';

import placeholderPicture from '../images/profile_default.png';

function VolunteersListItem(props) {
  return (
	<div className="volunteers-list__column">
		<div className="volunteers-list__picture">
			<img
				src={props.data.image? props.data.image : placeholderPicture}
				alt={`Profile of ${props.data.first_name} ${props.data.last_name}`} />
		</div>
		<div className="volunteers-list__contact">
			{props.data.email && <a href={`mailto:${props.data.email}`} className="icon icon__contact--email"><span>Email</span></a>}
			{props.data.facebook_url && <a href={props.data.facebook_url} className="icon icon__contact--facebook"><span>Facebook</span></a>}
			{props.data.instagram_url && <a href={props.data.instagram_url} className="icon icon__contact--instagram"><span>Instagram</span></a>}
		</div>
		<div className="volunteers-list__name">
			{props.data.first_name} {props.data.last_name}
		</div>
		<div className="volunteers-list__therapies">
			{props.data.therapies.slice(0,3).join(', ')}
			{props.data.therapies.length > 3? <span title={props.data.therapies.slice(3).join(', ')}> + {props.data.therapies.length - 3} more</span>:''}
		</div>
	</div>
  );
}

export default VolunteersListItem;
