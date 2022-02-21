var express = require('express');
var router = express.Router();
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');
const resolver = require('./resolver');


router.post(
  '/',
  graphqlHTTP({
    schema: schema,
    rootValue: resolver,
    graphiql: false,
  })
);

router.get(
  '/',
  graphqlHTTP({
    schema: schema,
    rootValue: resolver,
    graphiql: true,
  })
);

module.exports = router;
