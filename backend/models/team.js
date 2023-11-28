const mongoose = require('mongoose');

const teamSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    image: {
        type: String
    },
    players: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    teamLeader: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    points: {
        type: Number,
        default: 0
    },
    win: {
        type: Number,
        default: 0
    },
    lose: {
        type: Number,
        default: 0
    },
    tie: {
        type: Number,
        default: 0
    },
    points: {
        type: Number,
        default: 0
    },
    matches: {
        type: Number,
        default: 0
    },
    lastMatches: [{
        type: Number,
        validate: [arrayLimit, '{PATH} exceeds the limit of 5']
    }],
    goalsF: {
        type: Number,
        default: 0
    },
    goalsA: {
        type: Number,
        default: 0
    },
    social:{
        instagram: {
            type: String
        },
        facebook: {
            type: String
        },
        twitter: {
            type: String
        }
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
})

function arrayLimit(val) {
    return val.length <= 5;
}


module.exports = mongoose.model('Team', teamSchema);