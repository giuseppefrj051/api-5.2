const mongoose = require('mongoose');

const sensorsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: false
    },
    unit: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    highAlarm: {
        type: Number,
        required: true,
    },
    lowAlarm: {
        type: Number,
        required: true,
    },
    alarmAct: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('sensors', sensorsSchema); 