require("dotenv").config(); //configuring database
var express = require('express');
var cors = require('cors');
var bodyParser = require("body-parser");
var app = express();
const baseRoute = require("./api/Routes");
const { response } = require("express");

app.use(cors());
app.use('/Images', express.static('Images'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json({limit: '50mb'}));
app.use(bodyParser.json());
app.use(baseRoute);

app.listen(process.env.APP_PORT,()=>{
    console.log("server is running......" ,process.env.APP_PORT);
});
