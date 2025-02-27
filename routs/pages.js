const express = require('express');
const routs = express.Router();
const userMidd = require('../midd/usersMidd');


routs.get('/', userMidd.getUsers,(req, res) => {
    res.render('main',{users: res.users});
});


module.exports = routs;