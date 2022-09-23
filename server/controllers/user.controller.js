const User = require('../models/user.model');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const { response } = require('express');
const secret = process.env.SECRET_KEY;

module.exports = {
    // user registration
    register: async(req, res) => {
        const user = await User.findOne({email: req.body.email})

        if(user === null) {
            User.create(req.body)
                .then(user => {
                    const userToken = jwt.sign({
                        id: user._id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email
                    }, secret);
    
                    res
                        .cookie("usertoken", userToken, secret, {httpOnly: true})
                        .json({ msg: "success!", user: user })
                })
                .catch(err => res.status(400).json(err));
        } else {
            return res.status(400).json({errors: {email: {message: 'Email already exists!'}}})
        }
    },

    // user login
    login: async(req, res) => {
        const user = await User.findOne({ email: req.body.email });

        if(user === null) {
            // email not found in users collection
            return res.sendStatus(400)
        }

        // if we made it this far, we found a user with this email address
        // let's compare the supplied password to the hashed password in the database
        const correctPassword = await bcrypt.compare(req.body.password, user.password);

        if(!correctPassword) {
            // password wasn't a match!
            return res.sendStatus(400)
        }

        // if we made it this far, the password was correct
        const userToken = jwt.sign({
            id: user._id
        }, secret);

        // note that the response object allows chained calls to cookie and json
        res
            .cookie("usertoken", userToken, secret, {
                httpOnly: true
            })
            .json({ msg: "success!" });
    },
    
    // user logout
    logout: (req, res) => {
        res.clearCookie('usertoken');
        res.sendStatus(200);
    },

    // get all users
    getAllUsers: (req, res) => {
        User.find({})
            .then(users => res.json(users))
            .catch(err => {
                console.log(err)
                response.status(400).json(err)
            })
    },

    // get logged in user
    getLoggedInUser: (req, res) => {
        const decodeJWT = jwt.decode(req.cookies.usertoken, {
            complete: true
        })

        User.findOne({_id: decodeJWT.payload.id})
            .then(user => res.json(user))
            .catch(err => res.json(err))
    },

    // updateProfilePicture
    updateProfilePicture: (req, res) => {
        User.findOneAndUpdate({_id: req.params.id}, req.body, {
            new: true,
            })
            .then(profilePicture => res.json(profilePicture))
            .catch(err => {
                console.log(err)
                response.status(400).json(err)
            });
    }
}

// // get one product
// module.exports.getOneAuthor = (request, response) => {
//     Author.findOne({_id:request.params.id})
//         .then(author => {
//             console.log(author)
//             response.json(author)
//         })
//         .catch(err => {
//             console.log(err)
//             response.json(err)
//         })
// }

// // update product
// module.exports.updateAuthor = (request, response) => {
//     Author.findOneAndUpdate({_id: request.params.id}, request.body, {
//         new: true,
//         runValidators: true,
//         })
//         .then(updateAuthor => response.json(updateAuthor))
//         .catch(err => {
//             console.log(err)
//             response.status(400).json(err)
//         });
// }

// // delete product
// module.exports.deleteAuthor = (request, response) => {
//     Author.deleteOne({_id: request.params.id})
//         .then(deleteConfirmation => {
//             console.log(deleteConfirmation)
//             response.json(deleteConfirmation)
//         })
//         .catch(err => {
//             console.log(err)
//             response.json(err)
//         })
// }