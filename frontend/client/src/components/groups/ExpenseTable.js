/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension */
import axios from 'axios';
import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import '../../styles/myGroups.css';
import { getCurrentUserData, currencyFormatter } from '../../utils/commonUtils';
import { getDayOfWeek } from '../../utils/activityUtils';

class ExpenseTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expenses: [],
      statusCode: '',
      amount: '',
    };
  }

  componentDidMount = async () => {
    const { groupName } = this.props.group;
    try {
      const expensesRes = await axios.get(`http://localhost:3001/group/getExpensesList/${groupName}`);
      this.setState({ expenses: expensesRes.data });
      this.setState({ statusCode: expensesRes.status });
    } catch (err) {
      this.setState({ statusCode: err.response.status });
    }
  }

    onAmountChange = (e) => {
      console.log(e.target.value);
      this.setState({ amount: e.target.value });
    }

    updateExpense = async (expenseID, groupName) => {
      const currentUser = getCurrentUserData();
      const { email } = currentUser;
      const { amount } = this.state;
      const reqBody = {
        expenseID,
        amount,
        groupName,
        email,
      };
      console.log(reqBody);
      try {
        const updateRes = await axios.put('http://localhost:3001/group/updateExpense', reqBody);
        console.log(updateRes);
        alert('Expense Updated Successfullyu');
      } catch (err) {
        console.log(err);
        alert(`Unsuccessful update :${err.response.data}`);
      }
    }

    render() {
      console.log(this.state.expenses);
      const currentUser = getCurrentUserData();
      const currency = currentUser.default_currency;
      return (
        <Container className="justify-content-md-center-lower-group">
          <Row className="rrow">
            {this.state.statusCode !== 404
              ? this.state.statusCode === 200
                ? (
                  <table className="table" style={{ height: 'inherit' }}>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.expenses.map((expense) => (
                        <tr>
                          <th scope="row">
                            { getDayOfWeek(expense.date) }
                          </th>
                          <td>
                            { expense.description }
                          </td>
                          <td>
                            { currencyFormatter(currency, expense.amount) }
                          </td>
                          <td>
                            <input type="number" name="updateAmount" onChange={(event) => this.onAmountChange(event)} />
                            <button type="button" className="btn btn-secondary" onClick={() => this.updateExpense(expense.expense_id, expense.group_name)}>
                              Update expense
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )
                : <span> Loading expenses... </span> : <span> No expenses for this group! </span>}
          </Row>
        </Container>
      );
    }
}

export default ExpenseTable;
