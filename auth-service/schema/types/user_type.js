const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID
} = graphql;

export const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: {
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    name: { type: GraphQLString }
  }
});

export const UserPayload = new GraphQLObjectType({
  name: 'UserPayload',
  fields: {
    userId: { type: GraphQLID },
    code: { type: GraphQLID },
    message: { type: GraphQLString }
  }
});

