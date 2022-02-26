const { Schema, model } = require('mongoose');

const gameSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    owner: {
        type: String,
        required: true,
        trim: true
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
    datePosted: {
        type: Date,
        default: Date.now(),
    },
    tags: [
        {
            tagName: {
                type: String
            }
        },
    ],
    requests: [
        {
            type: Schema.Types.ObjectId,
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