import jwt from 'jsonwebtoken'
import User from '../model/user.js'
const accessTokenKey = process.env.ACCESS_TOKEN_KEY

export const genAccessToken = (user) => {
	return jwt.sign({ id: user._id, isAdmin: user.isAdmin }, accessTokenKey, {
		expiresIn: '20m',
	})
}

export const verify = (req, res, next) => {
	const authHeader = req.headers.authorization

	if (!authHeader) return res.status(401).json('Authorization failed: no token')
	else if (!authHeader.startsWith('Bearer'))
		return res.status(401).json('Authorization failed: token is not valid')

	const token = authHeader.split(' ')[1]

	jwt.verify(token, accessTokenKey, async (err, user) => {
		if (err)
			return res.status(403).json('Authorization failed: token is not valid')

		req.user = await User.findById(user.id).select('-password')
		next()
	})
}
