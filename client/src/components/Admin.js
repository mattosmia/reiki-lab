import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import AdminDistanceHealingReport from './_AdminDistanceHealingReport';
import AdminUsersReport from './_AdminUsersReport';
import { isAuthenticated } from './__Utils';

class Admin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentTab: 'DistanceHealingReport'
		}
	}

	componentDidMount() {
		isAuthenticated().then(user => {
			if (Object.keys(user).length) {
				if (user.role !== 'admin') {
					this.props.history.replace('/my-account');
				}
			} else {
				this.props.history.replace('/login');
			}
		})
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

export default withRouter(Admin);
