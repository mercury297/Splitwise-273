/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import '../../styles/groupPage.css';

class Summary extends Component {
  render() {
    console.log(this.props.data);
    return (
      <Container className="shadow p-3 mb-5 bg-white rounded justify-content-md-center-group">
        <Row className="rrow">
          <h4>
            {`${this.props.group.groupName}  `}
            Summary
          </h4>
        </Row>
        {this.props.data.map((summary) => (
          <Row>
            <br />
            <span style={{ padding: '5px' }}>
              {summary}
            </span>
          </Row>
        ))}
      </Container>
    );
  }
}

export default Summary;
