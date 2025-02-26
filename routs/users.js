const express = require('express');
const routs = express.Router();
const usersMidd = require('../midd/usersMidd');

routs.get('/', usersMidd.getUsers, (req, res) => {
    res.status(200).json(res.users);
});

routs.post('/', usersMidd.addUser, (req, res) => {
    res.status(201).json(res.newUser);
});

module.exports = routs;