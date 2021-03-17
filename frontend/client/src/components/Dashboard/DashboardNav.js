/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/jsx-no-undef */
import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../../styles/dashboard.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { currencyFormatter } from '../../utils/commonUtils';

class DashboardNav extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container className="shadow p-3 mb-5 bg-white rounded" className="justify-content-md-center">
        <Jumbotron className="jumbotron">
          <Row>
            <h3>Dashboard </h3>
            <Col><Button id="settle_button">Settle</Button></Col>
          </Row>
          <hr />
          <Row>
            <Col className="grid">
              <span>Total balance</span>
              <br />
              <span>
                {currencyFormatter('USD', this.props.totals.total)}
              </span>
            </Col>
            <Col className="grid">
              <span>You owe</span>
              <br />
              <span>
                {currencyFormatter('USD', this.props.totals.owes)}
              </span>
            </Col>
            <Col className="grid">
              <span>You are owed</span>
              <br />
              <span>
                {currencyFormatter('USD', this.props.totals.owed)}
              </span>
            </Col>
          </Row>
        </Jumbotron>
      </Container>
    );
  }
}

export default DashboardNav;
