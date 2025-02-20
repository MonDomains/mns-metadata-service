import { gql } from 'graphql-request';

const MON_NAMEHASH =
  '0xc6467acde3662083e12f3fbcf8aef57155a035e49629628eb9453948d1afb379';

export const GET_DOMAINS = gql`
  query getDomains($tokenId: String) {
    domain(id: $tokenId) {
      id
      name
      labelName
      createdAt,
      registeredAt,
      expiryDate
      owner {
        id
      }
    }
  }
`;