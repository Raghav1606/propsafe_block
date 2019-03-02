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

route.get('/viewAllPropId', (req, res) => {
    db.query("SELECT prop_id FROM transaction_master;").then((gates) => {
        console.log("Regno");
        console.log(gates[0]);
        res.send(gates[0]);
    })
});

route.get('/viewAllDeedId', (req, res) => {
    db.query("SELECT deed_id FROM transaction_master;").then((gates) => {
        console.log("Regno");
        console.log(gates[0]);
        res.send(gates[0]);
    })
});

route.get('/viewAllSROId', (req, res) => {
    db.query("SELECT sro_office_id FROM transaction_master;").then((gates) => {
        console.log("Regno");
        console.log(gates[0]);
        res.send(gates[0]);
    })
});

route.get('/viewAllLocalityId', (req, res) => {
    db.query("SELECT locality_id FROM transaction_master;").then((gates) => {
        console.log("Regno");
        console.log(gates[0]);
        res.send(gates[0]);
    })
});

route.get('/addNewTrans', (req, res) => {
    db.query("INSERT into transaction_master values('"+req.body.registraion_no+"','"+req.body.registraion_date+"','123','123','123','"+req.body.property_id+"','"+req.body.deed_id+"','123','"+req.body.sro_office+"','"+req.body.locality_id+"','"+req.body.book_no+"'"+req.body.mode_of_payment+"','"+req.body.buyer_id+"','"+req.body.status+"','self',20000)").then((gates) => {
         res.send("success");
    })
});





module.exports = route;
