const express = require('express');
const routs = express.Router();
const userMidd = require('../midd/usersMidd');


routs.get('/', userMidd.getUsers,(req, res) => {
    res.render('main',{users: res.users});
});

routs.get('/history/:user_id', (req, res) => {
    res.render('history', { user_id: req.params.user_id });
});

module.exports = routs;