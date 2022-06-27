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
    search: String
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

  type Works {
    title: String
    subtitle: String
    searchterms: String
    popular: Int
    recommended: Int
    id: ID
    genre: String
  }

  type Composer {
    status: Status
    request: Request
    composers: [Composers]
  }

  type Work {
    status: Status
    request: Request
    composer: Composers
    works: [Works]
  }

  type Query {
    composer(name: String!): Composer
    works(compId: String!, title: String!): Work
  }
`;

module.exports = typeDefs;
