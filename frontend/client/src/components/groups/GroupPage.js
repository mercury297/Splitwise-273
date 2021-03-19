/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';

class GroupPage extends Component {
  // eslint-disable-next-line no-unused-vars
  componentDidMount(props) {
    console.log('property_id', this.props.location);
  }

  render() {
    return (
      <div> Group page </div>
    );
  }
}

export default GroupPage;
