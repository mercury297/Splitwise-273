/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { graphql, withApollo } from 'react-apollo';
import { findUserQuery } from '../queries/queries';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      authUser: false,
    };
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount() {
    this.setState({
      authUser: false,
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    // const data = {
    //   email: this.state.email,
    //   password: this.state.password,
    // };
    const email = this.state.email;
    // console.log(this.state.email);
    // console.log(this.props.data);
    
    const { data } = await this.props.client.query({
      query: findUserQuery,
      variables: { email: this.state.email},
      fetchPolicy: "no-cache",
    });
    const user = data.user
    console.log(user)
    if(user.email){
      this.setState({ authUser: true });
      localStorage.setItem('user', JSON.stringify(user));
    }
    localStorage.setItem('user', JSON.stringify(user));
  };

  render() {
    // if (this.state.authUser) {
    //   return <Redirect to="/user/profile" />;
    // }
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              aria-describedby="emailHelp"
              onChange={(e) => {
                this.setState({ email: e.target.value });
              }}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={(e) => {
                this.setState({ password: e.target.value });
              }}
            />
          </div>
          <div className="form-group">
            <Link to="/user/register"> Don&apos;t have an account? </Link>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}

// const mapStateToProps = (state) => ({
//   authUser: state.auth.authUser,
// });

// const mapDispatchToProps = (dispatch) => ({
//   loginUser: (payload) => dispatch(loginUser(payload)),
// });

// export default Login;
export default withApollo(Login);
