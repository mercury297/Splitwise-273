/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { graphql } from 'react-apollo';
import { addUserMutation } from '../mutation/mutation';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      password: '',
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
    //   name: this.state.name,
    // };
    let mutationResponse = await this.props.addUserMutation({
      variables: {
        email: this.state.email,
        password: this.state.password,
        name: this.state.name,
    }
    });
    console.log(mutationResponse);
    const user = mutationResponse.data.addUser;
    if(user.email){
      this.setState({ authUser: true });
      localStorage.setItem('user', JSON.stringify(user));
    }
  };

  render() {
    if (this.state.authUser) {
      return <Redirect to="/user/profile" />;
    }
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
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter name"
              onChange={(e) => {
                this.setState({ name: e.target.value });
              }}
            />
          </div>
          <div className="form-group">
            <Link to="/user/login"> Already registered? </Link>
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
//   registerUser: (payload) => dispatch(registerUser(payload)),
// });

// export default Register;
export default graphql(addUserMutation, { name: "addUserMutation" })(Register);
