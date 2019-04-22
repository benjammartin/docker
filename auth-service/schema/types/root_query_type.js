const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID } = graphql;
import {UserType, UserPayload} from './user_type'
import SessionType from './session_type'
import authService from '../../services/authService'

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      resolve(parentValue, args, req) {
        return req.user;
      }
    },
    session: {
      type: SessionType,
      resolve(parentValue, args, req) {
        return authService.session({req})
      }
    }
  }
});

export default RootQueryType;