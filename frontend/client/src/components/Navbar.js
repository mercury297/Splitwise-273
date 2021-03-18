/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import '../App.css';
import '../styles/commonPage.css';

class SideNavbar extends Component {
  render() {
    return (
      <div className="sidebar">
        <a className="navItem" href="/dashboard">
          Dashboard
        </a>
        <a href="/recentActivity" className="navItem">
          Recent Activity
        </a>
        <a href="/user/profile" className="navItem">
          Profile
        </a>
        <a href="/createGroup" className="navItem">
          Create New Group
        </a>
        <a href="/myGroups" className="navItem">
          My Groups
        </a>
      </div>

    );
  }
}
export default SideNavbar;
