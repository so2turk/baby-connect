import jwt from 'jsonwebtoken'
const accessTokenKey = process.env.ACCESS_TOKEN_KEY

export const genAccessToken = (user) => {
	return jwt.sign({ id: user._id, isAdmin: user.isAdmin }, accessTokenKey, {
		expiresIn: '20m',
	})
}

export const verify = (req, res, next) => {
	const authHeader = req.header.auth

	if (!authHeader) return res.status(401).json('Authorization failed: no token')

	const token = authHeader.split(' ')[1]

	jwt.verify(token, tokenKey, (err, user) => {
		if (err)
			return res.status(403).json('Authorization failed: token is not valid')

		req.user = user
		next()
	})
}
