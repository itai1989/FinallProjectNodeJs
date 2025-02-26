const express = require('express');
const routs = express.Router();
const measurMidd = require('../midd/measurMidd');


routs.get('/',measurMidd,(req,res)=>{
    res.status(200).json(res.measurements);
})



module.exports = routs;