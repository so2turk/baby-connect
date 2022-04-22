import User from '../model/user'
import { genAccessToken } from '../util/auth'
import bcrypt from 'bcryptjs'

const saltRounds = 10

export const createUser = async (req, res) => {
	try {
		const salt = await bcyrpt.genSalt(saltRounds)
		const hashedPass = await bcyrpt.hash(req.body.password, salt)

		const userToCreate = new User({
			email: req.body.email,
			userName: req.body.userName,
			password: hashedPass,
			isAdmin: false,
		})

		const newUser = await userToCreate.save()
		res.status(200).json(newUser)
	} catch (err) {
		res.status(500).json({ msg: 'something went wrong', eMsg: err.message })
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
