const express = require('express');
const path = require('path');
const driver = require('bigchaindb-driver');
const routerics = express.Router();
var config = require('./config');


routerics.get('/', function(req, res){
    res.sendFile(path.join(__dirname, "../public/pages/index.html"));
})
routerics.get('/claims', function(req, res){
	let bdb = new driver.Connection(config.API_PATH, {
        app_id: config.app_id,
        app_key: config.app_key
	})
    var bcdb_results_list = [];
	bdb.searchAssets(config.bcdb_search_term)
        .then( data => {
            bcdb_results_list = data;
            console.log(bcdb_results_list);
            res.render(path.join(__dirname, "../public/pages/claims"), {
                claims: bcdb_results_list
            })
        }).catch( e=> {
            console.log(e)
        })
        //Maybe there is a faster and better way to do this, but my JS knowledge is not so good :/
})
routerics.get('/obills', function(req, res){
    res.sendFile(path.join(__dirname, "../public/pages/obills.html"));
})
routerics.get('/hbills', function(req, res){
    res.sendFile(path.join(__dirname, "../public/pages/hbills.html"));
})

module.exports = routerics;