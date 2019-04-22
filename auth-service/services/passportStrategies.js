import passport from 'passport';
import {
	prisma
} from '../generated/prisma-client'


const serialize = (user) => {
  if (user.id) {
    return Promise.resolve(user.id)
  } else if (user._id) {
    return Promise.resolve(user._id)
  } else {
    return Promise.reject(new Error("Unable to serialise user"))
  }
}

const deserialize = (id) => {
  return new Promise(async (resolve, reject) => {
    const user = await prisma.user({
      id
    })
    if (!user) return resolve(null)
    return resolve({
      id: user.id,
      email: user.email,
    })
  })
}

export default ({
  server
}) => {
  passport.serializeUser((user, next) => {
    serialize(user)
      .then(id => {
        next(null, id)
      })
      .catch(err => {
        next(err, false)
      })
  })

  passport.deserializeUser((id, next) => {
    deserialize(id)
      .then(user => {
        if (!user) return next(null, false)
        next(null, user)
      })
      .catch(err => {
        next(err, false)
      })
  })
}