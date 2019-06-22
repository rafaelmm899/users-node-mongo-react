"use strict";

const User = require("../models/user");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("../services/jwt");

function create(req, res) {
    var user = new User();
    var params = req.body;

    if (
        params.name &&
        params.lastname &&
        params.email &&
        params.dedication &&
        params.birthdate &&
        params.city &&
        params.country &&
        params.password
    ) {
        user.name = params.name;
        user.lastname = params.lastname;
        user.email = params.email;
        user.dedication = params.dedication;
        user.birthdate = new Date(params.birthdate);
        user.city = params.city;
        user.country = params.country;

        User.findOne({ email: user.email.toLowerCase() }, (err, userFinded) => {
            if (err) {
                res.status(500).send({
                    message: "Error in the request",
                    log: err.message
                });
            } else {
                if (!userFinded) {
                    bcrypt.hash(params.password, null, null, (error, hash) => {
                        if (error) {
                            res.status(500).send({
                                message: "Error in the request",
                                log: error.message
                            });
                        } else {
                            user.password = hash;
                            user.save((uError, userStored) => {
                                if (uError) {
                                    res.status(500).send({
                                        message: "Error in the request",
                                        log: uError.message
                                    });
                                } else {
                                    if (!userStored) {
                                        res.status(500).send({
                                            message: "Error saving the user"
                                        });
                                    } else {
                                        res.status(200).send({
                                            user
                                        });
                                    }
                                }
                            });
                        }
                    });
                } else {
                    res.status(404).send({
                        message: "User already exist"
                    });
                }
            }
        });
    } else {
        res.status(404).send({
            message: "All fields are required"
        });
    }
}

function login(req, res) {
    var params = req.body;

    if (params.email && params.password) {
        User.findOne({ email: params.email }, (err, user) => {
            if (err) {
                res.status(500).send({
                    message: "Error in the request"
                });
            } else {
                if (user) {
                    bcrypt.compare(params.password, user.password, function(
                        error,
                        userFinded
                    ) {
                        if (error) {
                            res.status(500).send({
                                message: "Error comparing passwords"
                            });
                        } else {
                            if (userFinded) {
                                res.status(200).send({
                                    user,
                                    token: jwt.createToken(userFinded)
                                });
                            } else {
                                res.status(400).send({
                                    message: "Incorrect password"
                                });
                            }
                        }
                    });
                } else {
                    res.status(400).send({
                        message: "Wrong email"
                    });
                }
            }
        });
    } else {
        res.status(404).send({
            message: "You must complete the data"
        });
    }
}

function findAll(req, res) {
    User.find((error, users) => {
        if (error) {
            res.status(500).send({
                message: "Error in the request"
            });
        } else if (!users) {
            res.status(400).send({
                message: "There are no users in the database"
            });
        } else {
            res.status(200).send({
                users
            });
        }
    });
}

function update(req, res) {
    var user = req.body;
    var userId = req.params.id;
    console.log(user);

    if (userId) {
        User.findOneAndUpdate(
            { _id: userId },
            user,
            { new: true },
            (error, userUpdated) => {
                if (error) {
                    res.status(500).send({
                        message: "Error in the request",
                        log: error.message
                    });
                } else {
                    if (!userUpdated) {
                        res.status(400).send({
                            message: "User no found"
                        });
                    } else {
                        res.status(200).send({
                            userUpdated
                        });
                    }
                }
            }
        );
    }
}

module.exports = {
    create,
    login,
    findAll,
    update
};
