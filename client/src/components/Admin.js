import React, { Component } from 'react';

import AdminDistanceHealingReport from './_AdminDistanceHealingReport';
import AdminUsersReport from './_AdminUsersReport';

class Admin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentTab: 'DistanceHealingReport'
		}
	}
	render() {
		return (
			<>
				<nav className="admin-dashboard__menu wrapper wrapper--padded-small">
					<ul className="unstyled-list">
						<li className={`${this.state.currentTab === 'DistanceHealingReport'?' active':''}`} onClick={() => this.setState({ currentTab: 'DistanceHealingReport' })}>Distance Healing Report</li>
						<li className={`${this.state.currentTab === 'UsersReport'?' active':''}`} onClick={() => this.setState({ currentTab: 'UsersReport' })}>Users Report</li>
					</ul>
				</nav>
				{ this.state.currentTab === 'DistanceHealingReport' && <AdminDistanceHealingReport />}
				{ this.state.currentTab === 'UsersReport' && <AdminUsersReport />}
			</>
		)
	};
}

export default Admin;
