/* eslint-disable no-unused-vars */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable jsx-a11y/tabindex-no-positive */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/jsx-filename-extension */
import '../App.css';
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Select from 'react-select';
import '../styles/createGroup.css';
import axios from 'axios';
import _ from 'lodash';
import SideNavbar from './Navbar';
import getArrayForSelect from '../utils/createGroupUtils';
import { getCurrentUserData } from '../utils/commonUtils';

class CreateGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
      selectedUsers: [],
    };
  }

  handleSelect = (opt) => {
    let newOpts = this.state.selectedUsers.concat({ user_id: opt.value, email: opt.label });
    newOpts = _.uniqBy(newOpts, 'user_id');
    this.setState({ selectedUsers: newOpts });
  }

  componentDidMount = async () => {
    const curentUser = getCurrentUserData();
    const res = await axios.get(`http://localhost:3001/group/createGroup//getUsersForGroup/${curentUser.email}`);
    // let userListForOptions = res.data.map((user) => user.email);
    const userListForOptions = getArrayForSelect(res.data);
    // console.log(userListForOptions);
    this.setState({ userList: userListForOptions });
  }

  handleSubmit = async (e) => {
    const curentUser = getCurrentUserData();
    const selUsers = this.state.selectedUsers;
    console.log('selected ', selUsers);
    e.preventDefault();
    const reqForCreate = {
      name: e.target.groupName.value,
      email: curentUser.email,
      userID: curentUser.user_id,
    };
    try {
      const groupCreateRes = await axios.post('http://localhost:3001/group/createGroup/createGroup', reqForCreate);
      if (groupCreateRes.status === 201) {
        const groupName = groupCreateRes.data.group.name;
        const { groupID } = groupCreateRes.data.group;
        const inviteList = [];
        for (let i = 0; i < selUsers.length; i += 1) {
          inviteList.push({
            user_id: selUsers[i].user_id,
            group_id: groupID,
            group_name: groupName,
            email: selUsers[i].email,
          });
        }
        console.log('invite list ', inviteList);
        const sendInviteRes = await axios.post('http://localhost:3001/group/createGroup/sendInvite', inviteList);
        if (sendInviteRes.status === 201) {
          alert('Group created successfully and Invitations sent!');
        } else {
          alert('Group created successfully but could not send Invitations!');
        }
      }
    } catch (err) {
      alert(err);
    }
  }

  render() {
    return (
      <div>
        <SideNavbar />
        <div className="content-block">
          <img className="envelope" src="https://assets.splitwise.com/assets/core/logo-square-65a6124237868b1d2ce2f5db2ab0b7c777e2348b797626816400534116ae22d7.svg" alt="No img" width="200" height="200" />

          <h2>Start a new group</h2>
          <form id="new_group" className="form" onSubmit={this.handleSubmit}>
            <div id="group_avatar_upload">
              <input type="file" id="group_avatar" />
            </div>
            <div className="Mygroupshallbe">
              My group shall be called…
            </div>
            <input tabIndex="1" placeholder="The Breakfast Club" autoComplete="off" type="text" id="group_name" name="groupName" />
            <hr />
            <h2>Group Memebers</h2>
            <div className=" d-flex flex-row bd-highlight mb-3 fields ">
              <img className="rounded-circle profile-pic" alt="usrprofile" src="https://s3.amazonaws.com/splitwise/uploads/user/default_avatars/avatar-blue23-50px.png" />
              <Select
                className="names"
                options={this.state.userList}
                onChange={(opt) => this.handleSelect(opt)}
              />
            </div>
            <div className=" d-flex flex-row bd-highlight mb-3 fields ">
              <img className="rounded-circle profile-pic" alt="usrprofile" src="https://s3.amazonaws.com/splitwise/uploads/user/default_avatars/avatar-blue23-50px.png" />
              <Select
                className="names"
                options={this.state.userList}
                onChange={(opt) => this.handleSelect(opt)}
              />
            </div>
            <div className=" d-flex flex-row bd-highlight mb-3 fields ">
              <img className="rounded-circle profile-pic" alt="usrprofile" src="https://s3.amazonaws.com/splitwise/uploads/user/default_avatars/avatar-blue23-50px.png" />
              <Select
                className="names"
                options={this.state.userList}
                onChange={(opt) => this.handleSelect(opt)}
              />
            </div>
            <span><a href="#">+ Add a person</a></span>
            <Button
              type="submit"
              style={{ backgroundColor: '#ff652f', marginLeft: '10px' }}
              className="btn btn-secondary btn-lg"
            >
              SAVE
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default CreateGroup;
