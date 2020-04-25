import React from 'react';
import { Link } from 'react-router-dom';

import columnImg1 from '../images/03b-about-us.jpg';
import columnImg2 from '../images/03c-distance-healing.jpg';
import columnImg3 from '../images/03d-volunteers.jpg';

function ThreeColumns() {
  return (
	<section className="three-columns wrapper wrapper--narrower">
		<div className="three-columns__columns">
			<div className="three-columns__column">
				<Link to="/about">
					<img src={columnImg1} alt="About Us" />
					<div className="btn btn--secondary">About us</div>
				</Link>
			</div>
			<div className="three-columns__column">
				<Link to="/distance-healing">
					<img src={columnImg2} alt="Distance Healing" />
					<div className="btn btn--secondary">Distance healing</div>
				</Link>
			</div>
			<div className="three-columns__column">
				<Link to="/volunteers">
					<img src={columnImg3} alt="Volunteers" />
					<div className="btn btn--secondary">Volunteers</div>
				</Link>
			</div>
		</div>
	</section>
  );
}

export default ThreeColumns;
