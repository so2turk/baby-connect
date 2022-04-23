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
	const { email, password } = req.body

	try {
		if (!email || !password)
			return res.status(400).json('Please add all fields')

		const user = await User.findOne({ email })
		if (!user) return res.status(400).json('Wrong email or password')

		const validPass = await bcrypt.compare(password, user.password)
		if (!validPass) return res.status(400).json('Wrong email or password1')

		// const refreshToken = genRefreshToken(user)

		res.status(200).json({
			userName: user.userName,
			accessToken: genAccessToken(user._id, user.isAdmin),
		})
	} catch (err) {
		res.status(500).json(err)
	}
}

export const userDetails = async (req, res) => {
	try {
		res.status(200).json(req.user)
	} catch (err) {
		res.status(500).json({ msg: 'something went wrong', eMsg: err.message })
	}
}

export const getUser = async (req, res) => {
	try {
		const user = await User.findById(req.params.userId)
		if (user)
			res.status(200).json({
				userName: user.userName,
				isAdmin: user.isAdmin,
			})
		else res.status(400).json('No such user')
	} catch (err) {
		res.status(500).json({ msg: 'something went wrong', eMsg: err.message })
	}
}
