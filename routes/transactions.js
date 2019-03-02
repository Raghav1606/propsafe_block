const express = require('express')
const route = express.Router();
const db = require('../db/models').db;


route.get('/viewAllRegNo', (req, res) => {
    db.query("SELECT registration_no FROM transaction_master;").then((gates) => {
        console.log(gates);
        res.send(gates[0]);
    })
});


module.exports = route;
