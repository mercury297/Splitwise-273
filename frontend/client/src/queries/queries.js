import { gql } from 'apollo-boost';

const findUserQuery = gql`
query user($email: String){
    user(email:$email){
      name,
      email,
      language,
      user_id,
      phone_number,
      photo_URL,
      phone_number,
      timezone
    }
  }
`;

const getActivities = gql`
query activity($userID: String){
  activity(userID:$userID){
    activity_id,
    operation_type,
    email,
    group_name,
  }
}
`;

const getExpenses = gql`
query expenses($group_name: String){
  expenses(group_name:$group_name){
    expense_id,
    date,
    description,
    paid_by,
    amount,
    expense_added_by,
    group_name
  }
}
`;

const getMyGroups = gql`
query myGroups($user_id: String){
  myGroups(user_id:$user_id){
    group_user_id,
    invite_flag,
    group_id,
    user_id,
    email,
    group_name
  }
}
`;

export {
  findUserQuery,
  getActivities,
  getExpenses,
  getMyGroups,
}