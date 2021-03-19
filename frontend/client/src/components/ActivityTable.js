/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { getActivitySummary, getDayOfWeek } from '../utils/activityUtils';

class ActivityTable extends Component {
  render() {
    console.log(this.props);
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Activity</th>
          </tr>
        </thead>
        <tbody>
          {this.props.activities.map((activity) => (
            <tr className="table">
              <th scope="row">{ getDayOfWeek(activity.createdAt) }</th>
              <td>
                { getActivitySummary(activity.email, activity.group_name,
                  activity.operation_type) }
              </td>
            </tr>
          )) }
        </tbody>
      </table>
    );
  }
}

export default ActivityTable;
