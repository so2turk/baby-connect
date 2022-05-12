import jwt from 'jsonwebtoken'
import User from '../model/user.js'
const accessTokenKey = process.env.ACCESS_TOKEN_KEY
const refreshTokenKey = process.env.REFRESH_TOKEN_KEY

export const genAccessToken = (date, user) => {
	return jwt.sign(
		{
			date: date,
			userName: user.userName,
			id: user._id,
			isAdmin: user.isAdmin,
		},
		accessTokenKey,
		{
			expiresIn: '10s',
		}
	)
}

export const genRefreshToken = (date) => {
	return jwt.sign({ date: date }, refreshTokenKey, { expiresIn: '1d' })
}

export const verify = (req, res, next) => {
	const authHeader = req.headers.authorization || req.headers.Authorization

	if (!authHeader) return res.status(401).send('Authorization failed: no token')
	else if (!authHeader.startsWith('Bearer'))
		return res.status(401).send('Authorization failed: token is not valid')

	const token = authHeader.split(' ')[1]

	jwt.verify(token, accessTokenKey, async (err, user) => {
		if (err)
			return res.status(403).send('Authorization failed: token is not valid')

		req.user = await User.findById(user.id).select('-password')
		next()
	})
}
