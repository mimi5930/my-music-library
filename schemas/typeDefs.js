const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Status {
    version: String
    success: String
    error: String
    source: String
    rows: Int
    processingtime: Float
    api: String
  }

  type Request {
    type: String
    item: String
  }

  type Composers {
    id: ID
    name: String
    complete_name: String
    birth: String
    death: String
    epoch: String
    portrait: String
  }

  type Composer {
    status: Status
    request: Request
    composers: [Composers!]
  }

  type Query {
    composer(name: String!): Composer
  }
`;

module.exports = typeDefs;
