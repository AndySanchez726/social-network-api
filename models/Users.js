const { Schema, model, Types } = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            match: [ /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, 'Please use a valid email address.']
        },
        thoughts: [
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        ],
        friends: [
            type: Schema.Types.ObjectId,
            ref: 'Users'
        ]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

UserSchema.virtual('thoughtCount').get(function() {
    return this.thoughts.length

// create the user model using userschema
const User = model('User', UserSchema);

// export user model
module.exports = User;