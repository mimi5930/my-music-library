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
    _id: String
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

  type Location {
    _id: String
    name: String
    works: [CollectedWorks]
  }

  type Query {
    composer(name: String!): Composer
    works(compId: String!, title: String!): Work
    locations: [Location]
    locationId(locId: String!): Location
    locationName(name: String!): Location
    dbWorks: [CollectedWorks]
    dbComposerId(compId: String!): [CollectedWorks]
    dbComposerName(name: String!): [CollectedWorks]
    dbWorkId(workId: String!): CollectedWorks
    dbWorkTitle(title: String!): [CollectedWorks]
  }

  type Mutation {
    addLocation(name: String!): Location
    editLocation(locId: String, name: String!): Location
    deleteLocation(locId: String): Location

    addWork(workId: String!): CollectedWorks
    customWork(
      title: String!
      genre: String
      compName: String!
      compComplete_name: String
      epoch: String
    ): CollectedWorks
    customWorkCompId(
      title: String!
      compId: String!
      genre: String!
    ): CollectedWorks
    deleteWork(workId: String!): CollectedWorks
    editGenre(workId: String!, genre: String!): CollectedWorks

    insertWork(workId: String!, locId: String!): Location
    removeWork(workId: String!, locId: String!): Location
  }
`;

module.exports = typeDefs;
