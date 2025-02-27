const express = require('express');
const routs = express.Router();
const Midd = require('../midd/measurMidd');


routs.get('/:user_id',Midd.getMeasure,(req,res)=>{
    res.status(200).json(res.measurements);
})

routs.post('/', Midd.addMeasure, (req, res) => {
    res.status(201).json(res.newMeasurement);
});

routs.post('/history/:user_id', Midd.getHistory, (req, res) => {
    const { measurements, avgHigh } = res.locals;
    res.json({ measurements, avgHigh });
});

routs.post('/summary', Midd.getUsersSummary, (req, res) => {
    res.json(res.locals.usersSummary);
});

module.exports = routs;