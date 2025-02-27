const express = require('express');
const routs = express.Router();
const Midd = require('../midd/measurMidd');


routs.get('/:user_id',Midd.getMeasure,(req,res)=>{
    res.status(200).json(res.measurements);
})

routs.post('/', Midd.addMeasure, (req, res) => {
    res.status(201).json(res.newMeasurement);
});

module.exports = routs;