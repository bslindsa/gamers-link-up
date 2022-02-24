const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const gameSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    owner: {
        type: Schema.Types.objectID,
        ref: 'User'
    },
    description: {
        type: String,
        required: 'Please describe this product.',
        minlength: 1,
        maxlength: 280,
        trim: true,
    },
    platform: {
        type: String,
    },
    price: {
        type: Number,
    },
    date_posted: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
    tags: [
        {
            name: {
                type: String
            }
        },
    ],
    requests: [
        {
            type: Schema.Types.objectID,
            ref: 'User'
        },
    ],
},
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

gameSchema
    .virtual('numRequests')
    .get(() => {
        return this.requests.length;
    });

const Game = model('Game', gameSchema);

module.exports = Game;