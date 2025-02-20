const express  = require('express');
const app = express();
const port =  5000;

app.listen(port,()=>{
    console.log(`running on http://localhost:${port}`);
})

const users = require('./routs/users');
app.use('/users',users);