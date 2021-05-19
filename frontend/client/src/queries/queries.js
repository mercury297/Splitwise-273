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

export {
  findUserQuery
}