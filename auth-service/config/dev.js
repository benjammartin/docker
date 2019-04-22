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
let GOOGLE_ID = '614808468271-9pka5rlcreqoichdl88711phkf8a5bma.apps.googleusercontent.com'
let GOOGLE_SECRET = 'o8ZYNV74oPJ6zKlGntb1b5EO'



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
