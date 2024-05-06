import { gql } from '@apollo/client';

// Add type definitions for the input
export interface DeleteConnectionInput {
  id: string;
  // Add any other fields needed for the input
}

// Add a default description for the deleteConnection mutation
const DELETE_CONNECTION_DESCRIPTION = "Deletes a connection given its id";

export const DELETE_CONNECTION = gql`
  mutation DeleteConnection($input: DeleteConnectionInput!) {
    deleteConnection(input: $input) {
      id
      // Add any other fields needed for the response
    }
  }
`, {
  description: DELETE_CONNECTION_DESCRIPTION
}
