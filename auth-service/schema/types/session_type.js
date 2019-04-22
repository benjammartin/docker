const graphql = require('graphql');
import {UserType, UserPayload} from './user_type'
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLEnumType,
  GraphQLInt,
  GraphQLList
} = graphql;

const SessionType = new GraphQLObjectType({
  
  name: 'SessionType',
  fields: {
    maxAge: { type: GraphQLInt},
    revalidateAge: { type: GraphQLInt},
    user:{
        type: UserType, 
        args:{
            email:{type: GraphQLString},
            email:{type: GraphQLString}
        }
    }
  }
});

export default SessionType;