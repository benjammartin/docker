let sessionSecret = 'change-me'
let sessionCookie = 'connect.sid'
let sessionMaxAge = 10 * 10 * 24 * 7
let sessionRevalidateAge = 60000
let port = 4000
let graphqlURL = `http://localhost:${port}/graphql`
let sessionResave = true
let sessionRolling = true
let sessionSaveUninitialized = false
let trustProxy = true
let csrf = true
let pathPrefix = '/auth'

export  {
    sessionSecret, 
    sessionCookie, 
    sessionMaxAge, 
    sessionRevalidateAge, 
    graphqlURL,
    port,
    sessionResave,
    sessionRolling,
    sessionSaveUninitialized,
    trustProxy,
    csrf,
    pathPrefix,
    GOOGLE_ID,
    GOOGLE_SECRET
}