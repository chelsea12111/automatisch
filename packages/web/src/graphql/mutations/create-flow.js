import { gql } from '@apollo/client';

// Define the shape of the input argument
interface CreateFlowInput {
  name: string;
  // Add any other fields that are required for creating a flow
}

// Use the defined input type in the mutation
export const CREATE_FLOW = gql`
  mutation CreateFlow($createFlowInput: CreateFlowInput!) {
    createFlow(input: $createFlowInput) {
      id
      name
    }
  }
`;
