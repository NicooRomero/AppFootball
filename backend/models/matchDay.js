const mongoose = require('mongoose');

const MatchDaySchema = new mongoose.Schema({
    matches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Match' }],
    date: Date,
});

const MatchDay = mongoose.model('MatchDay', MatchDaySchema);

module.exports = MatchDay;