const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        nameIndex: {
            type: String,
            required: true,
            unique: true,
        },
        keyUnique:{
            type: String,
            required: true,
        }
    },
    { collection: 'Index' },
    { timestamps: true }
)

module.exports = mongoose.model('Index', userSchema)