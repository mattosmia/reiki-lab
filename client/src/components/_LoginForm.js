import React from 'react';
import { Link } from 'react-router-dom';

function LoginForm() {
	return (
		<section className="login-form">
			<div className="wrapper">
				<h1 className="module-heading module-heading--pink">Log in</h1>
				<p>Please, enter your details below or <Link to="/register">sign up</Link></p>
				<form noValidate className="form" method="POST">
					<label htmlFor="lfEmail">Email</label>
					<input type="email" name="lfEmail" id="lfEmail" placeholder="Email" />
					<label htmlFor="lfPassword">Password</label>
					<input type="password" name="lfPassword" id="lfPassword" placeholder="Password" />
					<button className="btn btn--secondary">Log in</button>
					<p className="small"><Link to="/forgot-password">Forgotten password?</Link></p>
				</form>
			</div>
		</section>
	);
}

export default LoginForm;
