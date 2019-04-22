require('dotenv').config();
const express = require('express')
const session = require('express-session')
const RedisStore = require('connect-redis')(session);
const passport  = require('passport')
const server = express()
const cookieParser = require('cookie-parser');
const cors = require('cors');


const corsMiddleware = {
  origin: process.env.ORIGIN_URL,
  credentials: true,
  preflightContinue: false,
};

server.use(cors(corsMiddleware));
server.options(cors(corsMiddleware));

server.use(cookieParser());

server.use(session({
  name: 'app-session-id',
  store: new RedisStore({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  }),
  resave: false,
  saveUninitialized: true,
  secret: 'secret'
}))

server.use(passport.initialize());
server.use(passport.session());

passport.serializeUser((userId, done) => {
  done(null, userId);
});

passport.deserializeUser((userId, done) => {
  done(null, userId);
});


server.use('/booking', (req, res) => {
  res.json({
    message: req.user,
    session:req.session
  })
});

server.listen(process.env.PORT, process.env.HOST, () =>
  console.log(`Booking-service running ${process.env.HOST}:${process.env.PORT}`),
);