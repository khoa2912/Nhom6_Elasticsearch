const bcrypt = require('bcrypt')
const shortid = require('shortid')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const generateJwtToken = (_id) => {
    return jwt.sign({ _id }, 'test', {
      expiresIn: "1d",
    });
  };
const User=require('../model/User')
class UserController {
    signup(req, res) {
        User.findOne({ email: req.body.email }).exec(async (error, user) => {
            if (user)
                return res.status(400).json({
                    error: 'User already registered',
                })
            const { fullName, email, password } = req.body
            const hash_password = await bcrypt.hash(password, 10)

            const _user = new User ({
                fullName,
                email,
                hash_password,
                userName: shortid.generate(),
            })
            _user.save((error, user) => {
                if (error) {
                    console.log(error)
                    return res.status(400).json({
                        message: 'Something went wrong',
                    })
                }
                if (user) {
                    const token = generateJwtToken(user._id);
                    const { _id, fullName, email } = user;
                    return res.status(201).json({
                      token,
                      user: { _id, email, fullName },
                    });
                  }
            })
        })
    }

    signin (req, res) {
        User.findOne({ email: req.body.email }).exec(async (error, user) => {
          if (error) return res.status(400).json({ error });
          if (user) {
            const isPassword = await user.authenticate(req.body.password);
            if (isPassword) {
              const token = generateJwtToken(user._id);
              const { _id, fullName, email } = user;
              res.status(200).json({
                token,
                user: { _id, email, fullName },
              });
            } else {
              return res.status(400).json({
                message: "Something went wrong",
              });
            }
          } else {
            return res.status(400).json({ message: "Something went wrong" });
          }
        });
      };
}
module.exports = new UserController()