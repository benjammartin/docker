import '@babel/polyfill';
import bcryt from 'bcrypt';
import {
	prisma
} from '../generated/prisma-client'
import {
	sessionMaxAge,
	sessionRevalidateAge
} from '../config/key'

export default class {

	static async session({
		req
	}) {
		let session = {
			maxAge: sessionMaxAge,
			revalidateAge: sessionRevalidateAge,
		}
		if (req.user) {
			session.user = req.user
		}
		return session
	}

	static async createUser({
		name,
		email,
		password
	}) {
		if (!email || !password) {
			throw new Error("Email & Password are needed");
		}
		const existing = await prisma.$exists.user({
			email,
		})
		if (existing) {
			throw new Error("User already here");
		} else {
			const hashedPassword = await bcryt.hash(password, 10)
			password = hashedPassword
			const createdUser = await prisma.createUser({
				email,
				password,
				name
			})
			if(createdUser) {
				return {
					userId:createdUser.id,
					code:200, 
					message:'success'
				}
			}
		}
	}

	static async loginUser({
		req,
		email,
		password
	}) {
		if (!email || !password) {
			throw new Error("Email & Password are needed")
		}
		const existing = await prisma.user({
			email
		})
		if (!existing) {
			throw new Error("User not found!")
		} else {
			const isMatch = await bcryt.compare(password, existing.password);
			if (!isMatch) {
				throw new Error("Wrong username or password")
			}
			return new Promise((resolve, reject) => {
				if (isMatch) {
					req.login(existing, (err) => {
						if (err) {
							reject(err)
						}
						resolve(
							{
                userId:existing.id,
                code:200, 
                message:'success'
              }
            )
					})
				}
			})
		}
	}
}