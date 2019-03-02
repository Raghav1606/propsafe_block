const express = require('express')
const route = express.Router();
const db = require('../db/models').db;


route.get('/viewAllRegNo', (req, res) => {
    db.query("SELECT registration_number FROM transaction_master;").then((gates) => {
        console.log("Regno");
        console.log(gates[0]);
        res.send(gates[0]);
    })
});

route.get('/viewAllBuyerID', (req, res) => {
    db.query("SELECT first_party_1, first_party_2 , first_party_3  FROM transaction_master;").then((gates) => {
        console.log("Regno");
        console.log(gates[0]);
        res.send(gates[0]);
    })
});


module.exports = route;
