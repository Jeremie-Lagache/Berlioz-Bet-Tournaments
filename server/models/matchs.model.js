const mongoose = require('mongoose')

const Match = new mongoose.Schema(
	{
		sport: { type: String, required: true, unique: true },
		teams: { type: [String], required: true },
		tour: {type: String, required: true },
		date: {type: String},
		cotes: { type: [Number], required: true },
		counts: {type: [Number], required: true},
		state: {type: String, required: true },
		score: {type: Array},
		winner: {type: String}
	},
	{ collection: 'matchs' }
)

const model = mongoose.model('MatchsData', Match);

module.exports = model;