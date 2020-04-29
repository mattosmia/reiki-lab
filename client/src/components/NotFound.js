import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
	return (
		<section className="content-page">
			<div className="content-page__heading wrapper">
				<h1 className="module-heading module-heading--pink">Page not found</h1>
				<p>We're sorry about this. Please go back to our <Link to="/">homepage</Link>.</p>
			</div>
		</section>
	);
}

export default NotFound;
