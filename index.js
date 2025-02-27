const express = require('express');
const app = express();
const port = 5050;
const cors = require("cors");
const setupSwagger = require("./swagger");
app.use(express.json()); 
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views'); 
app.use(cors());

setupSwagger(app);

app.listen(port,()=>{
    console.log(`running on http://localhost:${port}`); 
})
//-----------------------------------------//
const users = require('./routs/users');
app.use('/users',users);

const measurements = require('./routs/measurements');
app.use('/measurements',measurements);

const pages = require('./routs/pages');
app.use('/pages',pages);