var Graphql = require("graphql");

module.exports = Graphql.buildSchema(`

type MutationResult {
    isMutated: Boolean!
    errMsg: String
    contact: Contact
}

type Contact {
    id: ID!
    name: String
    phoneNumber: String
}

type Query {
    test: String!
    testAsync(time: Int!): String!
    getContact(id: ID!): Contact
    doesPhoneNumberExist(phoneNumber: String!): Boolean!
    doesIDExist(id: String!): Boolean!
    getAllContacts: [Contact]
    getAllPhoneNumbers: [String]
}

type Mutation {
    insertContact(name: String!, phoneNumber: String!): MutationResult!
    updateContact(id: String!, name: String, phoneNumber: String): MutationResult!
    deleteContact(id: String!): MutationResult!
}
`);
