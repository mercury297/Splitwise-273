/* eslint-disable react/no-unused-state */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logoutDispatcher } from '../redux/actions/authAction';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false,
    };
  }

  render() {
    if (!this.props.authUser) {
      return <Redirect to="/login" />;
    }
    return (
      <div>
        <div> Welcome User! </div>
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => {
            this.props.logoutDispatcher();
          }}
        >
          Logout
        </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
