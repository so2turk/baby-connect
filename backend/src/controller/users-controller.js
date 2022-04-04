import User from '../model/user'
import bcyrpt from 'bcrypt'

const saltRounds = 10

export const createUser = async (req, res) => {
	try {
		const salt = await bcyrpt.genSalt(saltRounds)
		const hashedPass = await bcyrpt.hash(req.body.password, salt)

		const userToCreate = new User({
			email: req.body.email,
			userName: req.body.userName,
			password: hashedPass,
		})

		const newUser = await userToCreate.save()
		res.status(200).json(newUser)
	} catch (err) {
		res.status(500).json({ msg: 'something went wrong', eMsg: err.message })
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
