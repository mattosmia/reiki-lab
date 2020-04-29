import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';

import { fetchList, authHeaders } from './__Utils';
import AdminUsersReportRow from './_AdminUsersReportRow';
import Loading from './__Loading';

class AdminUsersReport extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			requestError: false,
			requestSuccess: false,
			currentReportPage: 1,
			entriesPerPage: 50,
			reportList: []
		}
		this.updateVolunteer = this.updateVolunteer.bind(this);
		this.deleteUser = this.deleteUser.bind(this);
	}

	componentDidMount() {
		this.loadEntries();
	}

	loadEntries = () => {
		fetchList('/users-report', authHeaders()).then(response => {
			this.setState({
				reportList: Object.values(response.data),
				loading: false
			});
		})
	}

	loadPage = () => {
		const initialIdx = (this.state.currentReportPage - 1) * this.state.entriesPerPage;
		return this.state.reportList.slice(initialIdx, initialIdx + this.state.entriesPerPage).map((data, idx) => <AdminUsersReportRow key={idx} data={data} updateVolunteer={this.updateVolunteer} deleteUser={this.deleteUser} />)
	}

	createPagination = () => {
		let pagination = [];
		for (let i = 0; i < (this.state.reportList.length / this.state.entriesPerPage); i++) {
			pagination.push(<div key={i} onClick={() => this.setState({currentReportPage: i+1})} className={(i+1) === this.state.currentReportPage? 'active' : ''}>{i+1}</div>);
		}
		return pagination;
	}

	updateVolunteer = (action,user_id) => {
		this.setState({
			loading: true
		}, () => {
			axios.post('/update-volunteer', { user_id, action }, authHeaders())
			.then(res => {
				this.setState({
					loading: false,
					requestError: false,
					requestSuccess: true
				}, this.loadEntries)
			}).catch(error => {
				this.setState({
					loading: false,
					requestError: true,
					requestSuccess: false
				});
				if (error.response.status === 401 || error.response.status === 403) {
					this.props.history.push('/login');
				}
			});
		});
	}

	deleteUser = (user_id) => {
		this.setState({
			loading: true
		}, () => {
			axios.post('/delete-user', { user_id }, authHeaders())
			.then(res => {
				this.setState({
					requestError: false,
					requestSuccess: true
				}, this.loadEntries)
			}).catch(error => {
				this.setState({
					loading: false,
					requestError: true,
					requestSuccess: false
				});
				if (error.response.status === 401 || error.response.status === 403) {
					this.props.history.push('/login');
				}
			});
		});
	}

	render () {
		return (
		<section className="admin-dashboard__report wrapper wrapper--padded-small">
			<h1 className="module-heading module-heading--pink">Users Report</h1>
			{ this.state.loading && <Loading /> }
			{ ! this.state.loading && this.state.reportList.length > 0 && <>
			<table className="admin-dashboard__table">
				<thead>
					<tr>
						<th>
							Full name
						</th>
						<th>
							Email
						</th>
						<th>
							Date of birth
						</th>
						<th>
							Country of residence
						</th>
						<th>
							Nationality
						</th>
						<th>
							Registered
						</th>
						<th>
							Volunteer
						</th>
						<th>
							
						</th>
					</tr>
				</thead>
				<tbody>
					{this.state.currentReportPage && this.loadPage()}
				</tbody>
			</table>
			<div className="pagination">
				{this.state.currentReportPage && this.createPagination()}
			</div>
			</>}
			{ ! this.state.loading && ! this.state.reportList.length && <p>There are no entries available at the moment.</p>}
		</section>
		)
	};
}

export default withRouter(AdminUsersReport);
