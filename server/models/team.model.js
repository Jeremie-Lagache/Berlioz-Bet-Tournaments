const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
    name: { type: String, required: true },
});

const Team = new mongoose.Schema(
    {
        classe: { type: String, required: true },
        players: [PlayerSchema] // Embedding the PlayerSchema within the TeamSchema
    },
    { collection: 'teams' }
);

const model = mongoose.model('TeamData', Team);

module.exports = model;
