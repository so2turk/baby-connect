import User from '../model/user.js'
import bcrypt from 'bcryptjs'
import { genAccessToken, genRefreshToken } from '../util/auth.js'

const saltRounds = 11

export const createUser = async (req, res) => {
	const { userName, email, password } = req.body

	try {
		if (!userName || !email || !password)
			return res.status(400).json('Please add all fields')

		const userExists = await User.findOne({ email: email })
		if (userExists) return res.status(400).json('User already exists')

		const salt = await bcrypt.genSalt(saltRounds)
		const hashedPass = await bcrypt.hash(password, salt)

		const newUser = await User.create({
			email,
			userName,
			password: hashedPass,
			isAdmin: false,
		})

		res.status(200).json({
			id: newUser._id,
			userName: newUser.userName,
			accessToken: genAccessToken(newUser),
		})
	} catch (err) {
		res.status(500).json({ msg: 'Something went wrong', eMsg: err.message })
	}
}

export const login = async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email })
		if (!user) return res.status(400).json('wrong email or password')

		const validPass = await bcrypt.compare(req.body.password, user.password)
		if (!validPass) return res.status(400).json('wrong email or password')

		const accessToken = genAccessToken(user)

		res.status(200).json({
			accessToken,
			userName: user.userName,
			isAdmin: user.isAdmin,
		})
	} catch (err) {
		res.status(500).json(err)
	}
}

export const getUser = async (req, res) => {
	try {
		const user = await User.findById(req.params.userId)
		if (user) res.status(200).json(user)
		else res.status(400).json('No such user')
	} catch (err) {
		res.status(500).json({ msg: 'something went wrong', eMsg: err.message })
	}
}
