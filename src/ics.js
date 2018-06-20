const express = require('express');
const path = require('path');
const routerics = express.Router();

routerics.get('/', function(req, res){
    res.sendFile(path.join(__dirname, "../public/pages/index.html"));
})
routerics.get('/claims', function(req, res){
    res.sendFile(path.join(__dirname, "../public/pages/claims.html"));
})
routerics.get('/obills', function(req, res){
    res.sendFile(path.join(__dirname, "../public/pages/obills.html"));
})
routerics.get('/hbills', function(req, res){
    res.sendFile(path.join(__dirname, "../public/pages/hbills.html"));
})

module.exports = routerics;