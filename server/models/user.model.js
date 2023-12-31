const mongoose = require('mongoose')

const User = new mongoose.Schema(
	{
		surname: { type: String, required: true },
		name: { type: String, required: true, },
		username: { type: String, required: true, unique: true },
		classe: { type: String, required: true },
		tokens: {type: Number},
		pronos: {type: Array },
		password: { type: String, required: true },
	},
	{ collection: 'users' }
)

const model = mongoose.model('UserData', User)

module.exports = model