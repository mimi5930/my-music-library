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
    epoch: String
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

  type CollectedWorks {
    title: String
    subtitle: String
    id: ID
    genre: String
    composer: Composers
    added: String
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
    dbWorks: [CollectedWorks]
    dbComposerId(compId: String!): [CollectedWorks]
    dbComposerName(name: String!): [CollectedWorks]
    dbWorkId(workId: String!): CollectedWorks
    dbWorkTitle(title: String!): [CollectedWorks]
  }

  type Mutation {
    addWork(workId: String!): CollectedWorks
    removeWork(workId: String!): CollectedWorks
  }
`;

module.exports = typeDefs;
