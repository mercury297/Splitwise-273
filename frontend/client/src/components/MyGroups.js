/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable camelcase */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
import axios from 'axios';
import React, { Component } from 'react';
import '../App.css';
import Container from 'react-bootstrap/Container';
import { getCurrentUserData } from '../utils/commonUtils';
import SideNavbar from './Navbar';
import MyGroupsTable from './MyGroupsTable';
import InvitationsTable from './InvitationsTable';

class MyGroups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myGroups: [],
      myInvites: [],
    };
  }

  componentDidMount = async () => {
    const currentUser = getCurrentUserData();
    // eslint-disable-next-line camelcase
    const { user_id } = currentUser;
    const getGroupsRes = await axios.get(`http://localhost:3001/group/myGroups/getMyGroups/${user_id}`);
    const invitationsRes = await axios.get(`http://localhost:3001/group/myGroups/getInvitationList/${user_id}`);
    console.log('invite res ', invitationsRes);
    this.setState({ myGroups: getGroupsRes.data.myGroups });
    this.setState({ myInvites: invitationsRes.data });
  }

  render() {
    return (
      <div>
        <SideNavbar />
        <Container className="justify-content-md-center-lower lowerrectangle">
          <MyGroupsTable myGroups={this.state.myGroups} />
        </Container>
        <br />
        <br />
        <Container className="justify-content-md-center-lower lowerrectangle">
          <InvitationsTable myInvites={this.state.myInvites} />
        </Container>
      </div>
    );
  }
}

export default MyGroups;
