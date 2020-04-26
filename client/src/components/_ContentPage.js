import React from 'react';

function ContentPage(props) {
	return (
		<section className="content-page">
			<div className="content-page__heading wrapper">
				{props.heading && <h1 className="module-heading module-heading--pink">{props.heading}</h1>}
				{props.subheading && <p>{props.subheading}</p>}
			</div>
			{props.image && 
				<div className="content-page__image">
					<img src={props.image} alt={props.imageAltText? props.imageAltText:'Image'} />
				</div>
			}
			{props.content &&
				<div className="content-page__copy wrapper">
					{props.content}
				</div>
			}
		</section>
	);
}

export default ContentPage;
