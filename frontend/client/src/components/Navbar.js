/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { logoutDispatcher } from '../redux/actions/authAction';
import '../App.css';
import '../styles/commonPage.css';

class SideNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authFlag: true,
    };
  }

  // eslint-disable-next-line consistent-return
  renderRedirect = () => {
    if (this.state.authFlag === false) {
      return <Redirect to="/" />;
    }
  }

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
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            this.props.logoutDispatcher();
            this.setState({ authFlag: false });
          }}
        >
          Logout
        </button>
        {this.renderRedirect()}
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  authUser: state.auth.authUser,
});

const mapDispatchToProps = (dispatch) => ({
  logoutDispatcher: () => dispatch(logoutDispatcher()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SideNavbar);
