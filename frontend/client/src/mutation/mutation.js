import { gql } from 'apollo-boost';

const addUserMutation = gql`
    mutation ($name: String, $email: String, $password: String){
        addUser(name: $name, email: $email, password: $password){
            name,
            email,
            user_id
        }
    }
`;

const addGroupMutation = gql`
    mutation ($name: String, $email: String, $userID: String){
        addGroup(name: $name, email: $email, userID: $userID){
            name,
        }
    }
`;

const addExpenseMutation = gql`
    mutation ($paid_by: String, $amount: String, $group_name: String){
        addExpense(paid_by: $paid_by, amount: $amount, group_name: $group_name){
            paid_by,
            amount
        }
    }
`

export {
    addUserMutation,
    addGroupMutation,
    addExpenseMutation,
};