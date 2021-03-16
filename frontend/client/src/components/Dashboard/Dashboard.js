/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import axios from 'axios';
import DashboardNav from './DashboardNav';
import Duelist from './DueList';
import getTotalBalance from '../../utils/dashboardUtils';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      navData: {
        total: 0,
        owes: 0,
        owed: 0,
      },
    };
  }

  componentDidMount() {
    axios.get('http://localhost:3001/dashboard/getSummary/A@J.com')
      .then((res) => {
        console.log(res);
        const totalsObject = getTotalBalance(res.data);
        // eslint-disable-next-line react/no-access-state-in-setstate
        const navData = { ...this.state.navData };
        navData.total = totalsObject.total;
        navData.owes = totalsObject.owes;
        navData.owed = totalsObject.owed;
        this.setState({ navData });
      })
      .catch((errors) => {
        console.log(errors);
      });
  }

  render() {
    return (
      <div>
        <DashboardNav totals={this.state.navData} />
        <Duelist />
      </div>
    );
  }
}

export default Dashboard;
