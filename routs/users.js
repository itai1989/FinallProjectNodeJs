const express = require('express');
const routs = express.Router();
const usersMidd = require('../midd/usersMidd');

routs.get('/',usersMidd,(req,res)=>{
    res.status(200).json(res.name);
})
   


module.exports = routs;