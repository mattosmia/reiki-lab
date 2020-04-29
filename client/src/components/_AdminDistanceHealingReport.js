import React, { Component } from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

import { fetchList, authHeaders } from './__Utils';
import AdminDistanceHealingReportRow from './_AdminDistanceHealingReportRow';
import Loading from './__Loading';

class AdminDistanceHealingReport extends Component {
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
	}

    componentDidMount() {
		this.loadEntries();
	}

	loadEntries = () =>  {
		fetchList('/distance-healing-report', authHeaders()).then(response => {
			this.setState({
				reportList: Object.values(response.data),
				loading: false
			});
		});
	}

	purgeOldEntries = () => {
		this.setState({
			loading: true,
			requestError: false,
			requestSuccess: true
		}, () => {
			axios.post('/purge-list', { empty: ''}, authHeaders())
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

	loadPage = () => {
        const initialIdx = (this.state.currentReportPage - 1) * this.state.entriesPerPage;
		return this.state.reportList.slice(initialIdx, initialIdx + this.state.entriesPerPage).map((data, idx) => <AdminDistanceHealingReportRow key={idx} data={data} />)
	}

	createPagination = () => {
		let pagination = [];
		for (let i = 0; i < (this.state.reportList.length / this.state.entriesPerPage); i++) {
			pagination.push(<div key={i} onClick={() => this.setState({currentReportPage: i+1})} className={(i+1) === this.state.currentReportPage? 'active' : ''}>{i+1}</div>);
		}
		return pagination;
	}

	render () {
		return (
		<section className="admin-dashboard__report wrapper wrapper--padded-small">
			<h1 className="module-heading module-heading--pink">Distance Healing Report</h1>
			{ this.state.loading && <Loading /> }
			{ ! this.state.loading && this.state.reportList.length > 0 && <>
			{ this.state.requestSuccess && <p className="success-message">Entries older than 30 days have been removed.</p> }
			{ this.state.requestError && <p className="error-message">Sorry, an error occurred. Please try again.</p> }
			<button className="btn btn--secondary" onClick={this.purgeOldEntries}>Remove entries older than 30 days</button>
			<table className="admin-dashboard__table">
                <thead>
					<tr>
						<th>
							Full name
						</th>
						<th>
							Date of birth
						</th>
						<th>
							Country of residence
						</th>
						<th>
							Added to list
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

export default withRouter(AdminDistanceHealingReport);
