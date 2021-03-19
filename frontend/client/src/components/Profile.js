/* eslint-disable no-restricted-syntax */
/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { Redirect } from 'react-router';
import '../App.css';
import '../styles/profilePage.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import SideNavbar from './Navbar';
import { getCurrentUserData, updateCurrentUserData } from '../utils/commonUtils';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      currentUser: {},
      loggedIn: false,
    };
  }

  componentDidMount = () => {
    const currentUser = getCurrentUserData();
    if (currentUser === false) {
      this.setState({ loggedIn: false });
    } else {
      this.setState({ currentUser });
    }
  }

  handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const default_currency = e.target.default_currency.value;
      const timezone = e.target.timezone.value;
      const language = e.target.language.value;
      const name = e.target.name.value;
      const email = e.target.email.value;
      const phone_number = e.target.phone_number.value;
      const photo_URL = e.target.photo_URL.files[0];
      // eslint-disable-next-line no-unused-vars
      const updateData = {
        default_currency,
        timezone,
        language,
        name,
        email,
        phone_number,
        photo_URL: '',
      };
      console.log(
        default_currency,
        timezone,
        language,
        name,
        email,
        phone_number,
        photo_URL,
      );
      if (photo_URL !== '') {
        const reader = new FileReader();
        reader.readAsDataURL(photo_URL);
        const bodyParameters = new FormData();
        bodyParameters.append('file', photo_URL);
        bodyParameters.append('ID', this.state.currentUser.user_id);
        for (const key of bodyParameters.entries()) {
          console.log(`${key[0]}, ${key[1]}`);
        }
        const resPhotoUrl = await axios.post('http://localhost:3001/user/updateProfilePicture', bodyParameters);
        updateData.photo_URL = resPhotoUrl.data.update.Location;
        const res = await axios.post('http://localhost:3001/user/updateUserDetails', {
          userID: this.state.currentUser.user_id,
          updateData,
        });
        if (res.status === 200 && resPhotoUrl.status === 200) {
          updateData.user_id = this.state.currentUser.user_id;
          const newUserData = updateData;
          console.log(newUserData);
          updateCurrentUserData(newUserData);
          this.setState({ success: true });
          alert('Profile updated successfully!');
        }
      }
    } catch (err) {
      console.log(err);
      alert('Could not update profile!');
    }
  }

  render() {
    const currentUser = getCurrentUserData();
    console.log(localStorage);
    console.log(currentUser);
    let redirectVar = null;
    let currentURL = '';
    if (currentUser !== false) {
      currentURL = `https://splitwise-273.s3.us-east-2.amazonaws.com/${currentUser.user_id}`;
    } else {
      redirectVar = <Redirect to="/" />;
    }

    return (
      <div>
        {redirectVar}
        <SideNavbar />
        <div className="content-block-1">
          <img className="profile_picture" src={currentURL} alt="No img" width="200" height="200" />
          <form id="new_profile" className="form" method="post" onSubmit={this.handleSubmit}>
            <div id="photo_avatar_upload">
              <input name="photo_URL" type="file" id="profile_picture" onChange={this.onFileChange} />
            </div>
            <div className="input_1">
              <label>Your default currency</label>
              <br />
              <select defaultValue={currentUser.default_currency} name="default_currency" className="form-select" id="currency">
                <option value="USD">USD </option>
                <option value="KWD">KWD </option>
                <option value="BHD">BHD </option>
                <option value="GPB">GPB </option>
                <option value="EUR">EUR </option>
                <option value="CAD">CAD </option>
              </select>
              <br />
              <label>Your Time Zone</label>
              <br />
              <select name="timezone" className="form-select" id="Time Zone">
                <option value="PST">PST </option>
                <option value="EST">EST </option>
                <option value="IST">IST </option>
                <option value="PMT">PMT </option>
              </select>
              <br />
              <label>Language</label>
              <br />
              <select name="language" className="form-select" id="Language">
                <option value="English">English </option>
                <option value="Spanish">Spanish </option>
              </select>
            </div>
            <div className="input_2">
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>User Name</Form.Label>
                <Form.Control name="name" placeholder="John Doe" />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Email address</Form.Label>
                <Form.Control name="email" type="email" placeholder="JohnDoe@gmail.com" />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control name="phone_number" type="area" placeholder="1669123654" />
              </Form.Group>
            </div>
            <Button type="submit" style={{ backgroundColor: '#ff652f' }} className="btn btn-secondary btn-lg submit">SAVE</Button>
          </form>
        </div>
      </div>
    );
  }
}

export default Profile;
