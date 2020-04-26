import React, { Component } from 'react';

import { fetchList } from './__Utils';
import AdminDistanceHealingReportRow from './_AdminDistanceHealingReportRow';

class AdminDistanceHealingReport extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentReportPage: 1,
			entriesPerPage: 50,
			reportList: []
		}
	}

    componentDidMount() {
		fetchList('/distance-healing-report').then(response => {
			this.setState({
				reportList: Object.values(response.data)
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
			{ this.state.reportList.length > 0 && <>
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
			{ ! this.state.reportList.length && <p>There are no entries available at the moment.</p>}
		</section>
		)
	};
}

export default AdminDistanceHealingReport;
