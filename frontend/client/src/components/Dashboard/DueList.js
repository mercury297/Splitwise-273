/* eslint-disable react/no-unused-state */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import '../../styles/dashboard.css';
import { currencyFormatter, getCurrentUserData } from '../../utils/commonUtils';

// eslint-disable-next-line react/prefer-stateless-function
class DueList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const currentUser = getCurrentUserData();
    console.log('yes');
    console.log('state after loading:', this.state);
    return (
      <Container className="justify-content-md-center-lower">
        <Row>
          <Col><h3 style={{ color: '#999' }}>You Owe</h3></Col>
          <Col><h3 style={{ color: '#999' }}>You Are Owed</h3></Col>
        </Row>
        <div className="row row_1">

          <div className="col" id="uowelist">
            {this.props.data.owesList.map((elem) => (
              <ul>
                <li className="relationship">
                  <img src="https://s3.amazonaws.com/splitwise/uploads/user/default_avatars/avatar-orange37-100px.png" className="rounded-circle profilepic" alt="Avatar" />
                  <div className="name">
                    <span>
                      {' '}
                      {elem}
                      {' '}
                    </span>
                  </div>
                  <div className="balance_i_owe">
                    <span>
                      You Owe
                      {
                        ` ${currencyFormatter(currentUser.default_currency,
                          this.props.data.owesTotalsList[elem])}`
                        }
                    </span>
                  </div>
                  <ul className="balance_details">
                    <li>
                      {this.props.data.owes[elem]}
                    </li>
                  </ul>
                </li>
              </ul>
            ))}
          </div>

          <div className="col" id="urowedlist">
            {this.props.data.owedList.map((elem) => (
              <ul>
                <li className="relationship">
                  <img src="https://s3.amazonaws.com/splitwise/uploads/user/default_avatars/avatar-orange37-100px.png" className="rounded-circle profilepic" alt="Avatar" />
                  <div className="name">
                    <span>
                      {' '}
                      {elem}
                      {' '}
                    </span>
                  </div>
                  <div className="balance_i_owe">
                    <span>
                      You Are Owed
                      {' '}
                      {` ${
                        currencyFormatter(currentUser.default_currency,
                          this.props.data.owedTotalsList[elem])}`}
                    </span>
                  </div>
                  <ul className="balance_details">
                    <li>
                      {this.props.data.owed[elem]}
                    </li>
                  </ul>
                </li>
              </ul>
            ))}
          </div>

        </div>
      </Container>
    );
  }
}

export default DueList;
