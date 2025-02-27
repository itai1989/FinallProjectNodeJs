const express = require('express');
const routs = express.Router();


routs.get('/', (req, res) => {
    res.render('main');
});


module.exports = routs;