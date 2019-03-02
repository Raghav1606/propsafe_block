const express = require('express')
const route = express.Router();
const db = require('../db/models').db;


route.post('/email_pass', function (req, res) {

    db.query("SELECT email_id, password FROM govt_official_master WHERE email_id='"+req.body.email+"' AND password='"+req.body.pass+"';").then((data) => {
        console.log(data);
        res.send("Succesful Login");
    }).catch((err) => {
        console.log(err);
        res.send(err);
    })
});

module.exports = route;
