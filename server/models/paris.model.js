const mongoose = require('mongoose')

const Pari = new mongoose.Schema(
	{
		sport: { type: String, required: true, },
		match: {type: String, required: true, unique: true},
		parieur: { type: String, required: true },
		cote: { type: Number, required: true },
		team: {type: String, required: true},
		jetons: { type: Number, required: true },
		state: {type: String, required: true },
		result: {type: Boolean, required: true}
	},
	{ collection: 'paris' }
)

const model = mongoose.model('ParisData', Pari);

module.exports = model;