import User from '../model/user'

export const createUser = async (req, res) => {
	const userToCreate = User(req.params)
	try {
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
