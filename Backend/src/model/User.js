const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
            minLength: 3,
            maxLength: 20,
        },
        userName: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true,
        },
        hash_password: {
            type: String,
            required: true,
        },
    },
    { collection: 'User' },
    { timestamps: true }
)
userSchema.methods = {
    authenticate: async function (password) {
      return await bcrypt.compare(password, this.hash_password);
    },
  };

module.exports = mongoose.model('User', userSchema)