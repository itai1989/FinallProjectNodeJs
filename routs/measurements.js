const express = require('express');
const routs = express.Router();
const measurMidd = require('../midd/measurMidd');


routs.get('/:user_id',measurMidd,(req,res)=>{
    res.status(200).json(res.measurements);
})



module.exports = routs;