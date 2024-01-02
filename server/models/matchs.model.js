const mongoose = require('mongoose')

const Match = new mongoose.Schema(
	{
		sport: { type: String, required: true, unique: true },
		teams: { type: [String], required: true },
		tour: {type: String, required: true },
		cotes: { type: [Number], required: true },
		state: {type: String, required: true },
		score: {type: Array}
	},
	{ collection: 'matchs' }
)

const model = mongoose.model('MatchsData', Match);

module.exports = model;