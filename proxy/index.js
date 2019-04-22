require('dotenv').config();
const express = require('express')
const httpProxy = require('express-http-proxy')

const app = express()

const proxy = (host, root) =>
  httpProxy(host, {
    proxyReqPathResolver: (req) => `${root}${req.url}`,
  });


app.use('/auth', proxy(process.env.AUTH_HOST, '/auth'));
app.use('/booking', proxy(process.env.BOOKING_HOST, '/booking'));

app.listen(process.env.PORT, process.env.HOST, () =>
  console.log(`Proxy running at ${process.env.HOST}:${process.env.PORT}`),
);