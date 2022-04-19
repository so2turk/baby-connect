import jwt from 'jsonwebtoken'
const accessTokenKey = process.env.ACCESS_TOKEN_KEY

export const genAccessToken = (user) => {
	return jwt.sign({ id: user._id, isAdmin: user.isAdmin }, accessTokenKey, {
		expiresIn: '20m',
	})
}
