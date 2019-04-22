require('dotenv').config()
//Express
import express from 'express'
//NextJS
import next from 'next'
//Graphql
import GraphqlServer from 'express-graphql'
//Session Middleware
import session from 'express-session'
//Authentification Middleware
import passport from 'passport'
//Schema Graphql
import GraphqlSchema from './schema/schema'
//Passport
import passportStrategies from './services/passportStrategies'
//redis
import redis from 'redis'
//Config 
import {sessionMaxAge} from './config/key'


//const client = redis.createClient()
const RedisStore = require('connect-redis')(session);


const server = express()

server.use(session({
    name:'app-session-id',
    store: new RedisStore({
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        //client:client,
        ttl:20
    }),
    resave:false,
    saveUninitialized:true,
    secret:'secret'
}))
    
    server.use(passport.initialize())
    server.use(passport.session())
    
    passportStrategies({server})

    server.get('/api', (req, res) => {
        res.json({message:'success'})
    })
    
    server.use('/auth', GraphqlServer({
        schema: GraphqlSchema,
        graphiql: true
    }))
    
    server.listen(process.env.PORT, process.env.HOST, () => 
    console.log(`Backend running at ${process.env.HOST}:${process.env.PORT}`),
  )
  