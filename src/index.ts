import {gql, GraphQLClient} from 'graphql-request';
import { GetPrForBranch, GetPrForBranchVariables } from './__generated__/GetPrForBranch';

const graphQLClient = new GraphQLClient('https://api.github.com/graphql', {
    headers: {
        authorization: `Bearer ${ require('../secrets').password }`,
    },
});
function graphqlQuery<A, B>(query: string) {
    return async function(variables: B): Promise<A> {
        return await graphQLClient.request<A, B>(query, variables);
    }
}

// Sample query against github's API
export const getPrForBranch = graphqlQuery<GetPrForBranch, GetPrForBranchVariables>(gql `
    query GetPrForBranch($owner: String!, $repository: String!, $branch: String!) {
        repository(owner: $owner, name: $repository) {
            pullRequests(first: 1, headRefName: $branch) {
                nodes {
                    number
                }
            }
        }
    }
`);
