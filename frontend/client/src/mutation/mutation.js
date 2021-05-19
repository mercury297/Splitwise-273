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

export {
    addUserMutation
};