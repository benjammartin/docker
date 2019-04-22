const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString
} = graphql;

import {UserType, UserPayload} from './types/user_type'
import SessionType from './types/session_type'


import authService from '../services/authService'


const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    session: {
      type: SessionType,
      resolve(parentValue, args, req) {
        return authService.session({req})
      }
    },
    signup: {
      type: UserPayload,
      args: {
        email: {
          type: GraphQLString
        },
        password: {
          type: GraphQLString
        },
        name: {
          type: GraphQLString
        }
      },
      resolve(parentValue, {email, password, name}, context) {
        return authService.createUser({
          context,
          email,
          password,
          name
        })
      }
    },
    logout: {
      type: UserType,
      resolve(parentValue, args, req) {
        const {
          user
        } = req;
        //req.logout();
        return null;
      }
    },
    login: {
      type: UserPayload,
      args: {
        email: {
          type: GraphQLString
        },
        password: {
          type: GraphQLString
        },
        message: {
          type: GraphQLString
        }
      },
      resolve(parentValue, {
        email,
        password
      }, req) {
        return authService.loginUser({
          email,
          password,
          req
        })
      }
    }
  }
});

export default mutation;

