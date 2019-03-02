const express = require('express')
const route = express.Router();
const db = require('../db/models').db;



route.get('/block', (req, res) => {
    
	

var selectedAccount=0x92436d8467219ea92a7734ddb952c7c45fd52029;
     $.post('/setValidator', {account : selectedAccount}, function (response) {
        console.log("done hai :)"+response);

    })  
      
});


module.exports = route;
