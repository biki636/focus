const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        unique: true
    },

    email: {
        type: String,
        required: true,
        uniqu: true
    },

    password: {
        type: String,
        required: true
    },

    gender: {
        type: String,
        required: true,
    },

    dob: {
        type: Date,
        required: true
    },

    height: {
        type: Number
    },

    weight: {
        type: Number
    },

    goal: {
        type: String
    },

    doj: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);