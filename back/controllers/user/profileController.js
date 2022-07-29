// @desc 		Get user profile
// @route 	GET /api/users/profile
// @access 	Private

export const getUserProfile = (req, res) => {
	const user = {
		name: 'Denys',
		age: 20,
	}

	res.json(user)
}
