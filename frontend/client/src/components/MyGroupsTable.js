/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
import axios from 'axios';
import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { getCurrentUserData } from '../utils/commonUtils';

class MyGroupsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectGroup: {},
      redirect: false,
    };
  }

    handleClick = async (groupID, groupName) => {
      const currentUser = getCurrentUserData();
      const reqBody = { groupID, email: currentUser.email, user_id: currentUser.user_id };
      try {
        const leaveGroupRes = await axios.post('http://localhost:3001/group/myGroups/leaveGroup', reqBody);
        console.log('leave res', leaveGroupRes);
        if (leaveGroupRes.status === 200) {
          alert(`Group ${groupName} left successfully`);
        } else {
          alert('Please clear dues for this group');
        }
      } catch (err) {
        console.log(err);
        alert('Please clear dues for this group');
      }
    }

    handleGroupRedirect = (group) => {
      const redirectGroup = { groupID: group.group_id, groupName: group.group_name };
      this.setState({ redirectGroup });
      this.setState({ redirect: true });
    }

    render() {
      if (this.state.redirect) {
        return (
          <Redirect
            to={{
              pathname: '/group/',
              state: { group: this.state.redirectGroup },
            }}
          />
        );
      }
      return (
        <table className="table">
          <tbody>
            {this.props.myGroups.map((group) => (
              <tr className="table">
                <td>
                  <button type="button" className="btn btn-primary" style={{ backgroundColor: 'whitesmoke', color: 'black' }} onClick={() => this.handleGroupRedirect(group)}>
                    {group.group_name}
                  </button>
                </td>
                <td>
                  <button type="button" className="btn btn-primary" style={{ backgroundColor: '#ff652f' }} onClick={() => this.handleClick(group.group_id, group.group_name)}> Leave Group </button>
                </td>
              </tr>
            )) }
          </tbody>
        </table>
      );
    }
}

export default MyGroupsTable;
