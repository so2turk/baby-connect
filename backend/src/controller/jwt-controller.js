import { genAccessToken } from '../util/auth.js'

export const refreshToken = async (req, res) => {
	const user = req.user

	const accessToken = genAccessToken(new Date(), user)
	res.status(200).json({
		accessToken,
	})
}

export const logout = async (req, res) => {
	const user = req.user

	user.refreshToken = ''
	const loggedoutUser = await user.save()

	res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
	res
		.status(204)
		.send({ success: `${loggedoutUser.userName} successufully logged out` })
}
