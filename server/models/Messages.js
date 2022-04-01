const { Schema, model } = require('mongoose');

const messageSchema = new Shema({
    owner: {
        type: String,
        required: true,
        trim: true
    },
    sendTo: {
        type: String,
        required: true,
        trim: true
    },
    timeSent: {
        type: Date,
        default: Date.now(),
    },
    message: {
        type: String,
        required: true,
        trim: true
    }
});

const Messages = model('Messages', messageSchema);

module.exports = Messages;