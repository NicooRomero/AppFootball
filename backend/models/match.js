const mongoose = require('mongoose');

const MatchSchema = new mongoose.Schema({
    home: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
    away: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
    goalsH: String,
    goalsA: String,
    kickoff: String,
    day: String,
    stadium: String
});

const Match = mongoose.model('Match', MatchSchema);

module.exports = Match;