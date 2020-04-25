import React from 'react';
import { Link } from 'react-router-dom';

import background from '../images/03-what-is-reiki.jpg';

function Hero() {
  return (
	<section className="hero" style={{backgroundImage: `url(${background})`}}>
		<div className="wrapper">
			<h1>What is Reiki?</h1>
			<Link to="/what-is-reiki" className="btn">Find out more</Link>
		</div>
	</section>
  );
}

export default Hero;
