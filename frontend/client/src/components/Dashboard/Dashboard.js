/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import axios from 'axios';
import DashboardNav from './DashboardNav';
import Duelist from './DueList';
import { getTotalBalance, createArrayForDueList } from '../../utils/dashboardUtils';
// import { getTotalBalance } from '../../utils/dashboardUtils';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      navData: {
        total: 0,
        owes: 0,
        owed: 0,
      },
      data: {
        owesList: [],
        owedList: [],
        owesTotalsList: [],
        owedTotalsList: [],
        owes: [],
        owed: [],
      },
      dataEval: false,
    };
  }

  async componentDidMount() {
    try {
      const res = await axios.get('http://localhost:3001/dashboard/getSummary/A@J.com');
      console.log(res.data);
      const totalsObject = getTotalBalance(res.data);
      const navData = { ...this.state.navData };
      navData.total = totalsObject.total;
      navData.owes = totalsObject.owes;
      navData.owed = totalsObject.owed;
      const dueListObject = { owed: [], owes: [] };
      const totalsDueObject = { owed: [], owes: [] };
      const { owed } = res.data;
      const { owes } = res.data;
      if (owes.length > 0) {
        const arrayRes = createArrayForDueList(owes, false);
        dueListObject.owes = arrayRes.dueList;
        totalsDueObject.owes = arrayRes.totals;
      }
      if (owed.length > 0) {
        const arrayRes = createArrayForDueList(owed, true);
        dueListObject.owes = arrayRes.dueList;
        totalsDueObject.owes = arrayRes.totals;
      }
      this.setState({ navData });
      const data = { ...this.state.data };
      data.owesList = Object.keys(dueListObject.owes);
      data.owedList = Object.keys(dueListObject.owed);
      data.owes = dueListObject.owes;
      data.owed = dueListObject.owed;
      data.owesTotalsList = totalsDueObject.owes;
      data.owedTotalsList = totalsDueObject.owed;
      this.setState({ data });
      this.setState({ dataEval: true });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div>
        <DashboardNav totals={this.state.navData} />
        <Duelist data={this.state.data} fresh={this.state.dataEval} />
      </div>
    );
  }
}

export default Dashboard;
