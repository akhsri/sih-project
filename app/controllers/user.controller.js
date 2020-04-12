const User = require("../models/user.model");
const passport = require("passport");

var sendJSONresponse = function (res, status, content) {
    res.status(response);
    res.json(content);
}

// register user

module.exports.register = function (req, res) {
    var user = new User();

    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.department = req.body.department;
    user.email = req.body.email;
    user._id = req.body._id;
    user.setPassword(req.body.password)
    user.
        save()
        .then(user => {
            var token;
            token = user.generateJwt();
            res.status(200);
            res.json({
                token: token,
                user: user
            })
        })
        .catch(error => {
            res.status(500).json({
                error: error
            })
        })
}

// Find all users in the database

exports.findAll = (req, res) => {
    User.find()
        .then(users => {
            res.status(200).json(users);
        }).catch(err => {
            res.status(500).json({
                message: err.message || "Some error occurred while retrieving users."
            });
        });
};

// Find a specific user in the database using user ID

exports.findOne = (req, res) => {
    User.findById(req.user._id)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.user._id
                })
            }
            res.send(user)
        })
        .catch(err => {
            if (err.kind === "ObjectId") {
                return res.status(404).send({
                    message: "User not found with id " + req.user._id
                });
            }
            return res.status(500).send({
                message: "Error retreiving user with id " + req.user._id
            });
        });
};

// User login

module.exports.login = (req, res) => {
    if (!req.body.email || !req.body.password) {
        sendJSONresponse({
            message: "All fields required"
        });
        console.log("error: ", err);
        return;
    }

    passport.authenticate("local", function (err, user, info) {
        var token;
        console.log("token: ", token);

        // If passport throws/ catches an error
        if (err) {
            res.status(404).json(err);
            console.log("error: ", err);
            return
        }

        // If a user is found
        if (user) {
            token = user.generateJwt();
            res.status(200);
            res.json({
                token: token
            });
        } else {

            // If user is not foud
            res.status(401).json(info);
            console.log("error: ", err);
        }

    })(req, res)
}

// Delete a user with specific id from database

exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.userId)
        .then(user => {
            // if(!user) {
            //     return res.status(404).send({
            //         message: "User not found with id " + req.params.userId
            //     });
            // }
            res.send({ message: "User deleted successfully!" });
        })
        .catch(err => {
            if (err.kind === "ObjectId" || err.name === "NotFound") {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            return res.status(500).send({
                message: "Could not delete user with id " + req.params.userId
            });
        });
};
