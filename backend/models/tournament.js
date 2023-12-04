const mongoose = require('mongoose');

const tournamentSchema = mongoose.Schema({
    name : {
        type: String,
        require: true
    },
    season: {
        type: String,
        required: true
    },
    lastChampion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    },
    teams: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required: true
    }],
    fixture: [{}],
    image: {
        type: String,
        default: ''
    },

})

module.exports = mongoose.model('Tournament', tournamentSchema);