const express = require('express');
const graphql = require('express-graphql');
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} = require('graphql');

const app = express();

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      oneField: {
        type: GraphQLString,
        resolve(parent, args) {
          return 'oneField value';
        },
      },
    },
  })
});


app.use(async (req, res, next) => {
  // just comment out this line to see the request being successful
  const params = await graphql.getGraphQLParams(req);
  console.log(params);
  next();
});

app.use(
  '/graphql',
  graphql.graphqlHTTP({
    schema,
    graphiql: true,
  })
);


app.listen(1234, () => {
  console.log(`http://localhost:1234/graphql`);
});