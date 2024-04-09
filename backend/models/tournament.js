const mongoose = require('mongoose');

const tournamentSchema = mongoose.Schema({
    name : {
        type: String,
        require: true
    },
    description: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    teams: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required: true
    }],
    fixture: [{}],
    organizer: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    image: {
        type: String
    },

})

module.exports = mongoose.model('Tournament', tournamentSchema);