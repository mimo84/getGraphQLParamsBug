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


app.use((req, res, next) => {
  graphql.getGraphQLParams(req).then(params => {
    console.log(params);
    next();
  });
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