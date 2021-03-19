/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
/* eslint-disable camelcase */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
import Jumbotron from 'react-bootstrap/Jumbotron';
import React, { Component } from 'react';
import Select from 'react-select';
import '../App.css';
import '../styles/recentActivity.css';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import SideNavbar from './Navbar';
import { getCurrentUserData } from '../utils/commonUtils';
import ActivityTable from './ActivityTable';

class RecentActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: [],
      groupNames: [],
      displayActivities: [],
    };
  }

  componentDidMount = async () => {
    const currentUser = getCurrentUserData();
    const { user_id, email } = currentUser;
    const resForGroupNames = await axios.get(`http://localhost:3001/group/myGroups/getMyGroups/${user_id}`);
    const groupNames = resForGroupNames.data.myGroups.map((name) => ({
      label: name.group_name, value: name.group_name,
    }));
    this.setState({ groupNames });
    const res = await axios.get(`http://localhost:3001/recentActivity/getRecentActivity/${email}/${user_id}`);
    console.log(resForGroupNames.data.myGroups);
    console.log(res.data.body);
    this.setState({ activities: res.data.body });
    this.setState({ displayActivities: res.data.body });
    // console.log(this.state);
  }

  handleSelect = (groupName) => {
    // eslint-disable-next-line react/no-access-state-in-setstate
    let currentActs = this.state.activities;
    currentActs = currentActs.filter((acts) => acts.group_name === groupName);
    this.setState({ displayActivities: currentActs });
  }

  handleSort = (opt) => {
    let currentActs = this.state.displayActivities;
    if (opt === 'asc') {
      currentActs = currentActs.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      this.setState({ displayActivities: currentActs });
    } else {
      currentActs = currentActs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      this.setState({ displayActivities: currentActs });
    }
  }

  render() {
    const sortOptions = [{ label: 'first', value: 'desc' }, { label: 'last', value: 'asc' }];
    return (
      <div>
        <SideNavbar />
        <Jumbotron className="justify-content-md-center Title">
          <h3>Recent Acitivity </h3>
          <span id="mostRecent">
            Most recent
          </span>
          <Select
            placeholder=""
            defaultValue="desc"
            className="sort"
            options={sortOptions}
            onChange={(opt) => this.handleSort(opt.value)}
            style={{ marginLeft: '10px' }}
          />
          <Select
            className="names"
            options={this.state.groupNames}
            onChange={(opt) => this.handleSelect(opt.value)}
          />
        </Jumbotron>
        <Container className="justify-content-md-center-lower lowerrectangle">
          <ActivityTable activities={this.state.displayActivities} />
        </Container>
      </div>
    );
  }
}

export default RecentActivity;
