/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import axios from 'axios';
import SideNavbar from '../Navbar';
import ExpenseTable from './ExpenseTable';
import ExpenseModal from './ExpenseModal';
import Summary from './Summary';
import getSummaryArr from '../../utils/groupSummary';

class GroupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      summary: [],
    };
  }

  // eslint-disable-next-line no-unused-vars
  componentDidMount = async (props) => {
    // console.log('property_id', this.props.location);
    const { groupID } = this.props.location.state.group;
    const getSummaryRes = await axios.get(`http://localhost:3001/group/getSummary/${groupID}`);
    console.log(getSummaryRes.data);
    const summary = getSummaryArr(getSummaryRes.data);
    console.log(summary);
    this.setState({ summary });
  }

  render() {
    return (
      <div>
        <SideNavbar />
        <ExpenseModal group={this.props.location.state.group} />
        <ExpenseTable group={this.props.location.state.group} />
        <Summary data={this.state.summary} group={this.props.location.state.group} />
      </div>
    );
  }
}

export default GroupPage;
