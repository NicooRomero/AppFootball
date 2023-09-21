const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    document: { 
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: '',
        required: true
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
    },
    teamLeader:{
        type: Boolean,
        default: false
    },
    organizer: {
        type: Boolean,
        default: false
    },
    birthday:{
        type: Date,
        required: true
    },
    gender: {
        type: String
    },
    phone: {
        type: String
    },
    zip: {
        type: Number
    },
    nationality: {
        type: String,
    },
    province: {
        type: String
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
    height: Number,
    position: String,
    goals: Number,
    isAdmin: {
        type: Boolean,
        default: false
    },
    status: {
        enabled: {
            type: Boolean,
            default: true
        },
        toDate: {
            type: Date
        }
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', userSchema);