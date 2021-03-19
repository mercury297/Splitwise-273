/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
import axios from 'axios';
import React, { Component } from 'react';
import { getCurrentUserData } from '../utils/commonUtils';

class InvitationsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

    handleClick = async (groupID, groupName) => {
      const currentUser = getCurrentUserData();
      const reqBody = { groupID, userID: currentUser.user_id };
      try {
        const acceptRes = await axios.post('http://localhost:3001/group/myGroups/acceptInvitation', reqBody);
        console.log(acceptRes);
        if (acceptRes.status === 200) {
          alert(`Invite from ${groupName} accepted successfully`);
        } else {
          alert('Could not accept invite');
        }
      } catch (err) {
        console.log(err);
      }
    }

    render() {
      return (
        <table className="table">
          <tbody>
            {this.props.myInvites.map((invite) => (
              <tr className="table">
                <td>
                  {invite.group_name}
                </td>
                <td>
                  <button type="button" className="btn btn-primary" style={{ backgroundColor: '#ff652f' }} onClick={() => this.handleClick(invite.group_id, invite.group_name)}> Accept Invite </button>
                </td>
              </tr>
            )) }
          </tbody>
        </table>
      );
    }
}

export default InvitationsTable;
