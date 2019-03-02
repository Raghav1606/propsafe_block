const express = require('express')
const route = express.Router();
const db = require('../db/models').db;

route.post('/email_pass', function (req, res) {
db.query('GRANT ALL PRIVILEGES ON TABLE govt_official_master TO airportuser');

    db.query(`INSERT INTO govt_official_master values('${req.body.govt_id}','${req.body.phone}','${req.body.aadhar_card_no}','${req.body.pass}','${req.body.email}')`).then((data) => {
        console.log(data);
        res.send("Succesful Register");
    }).catch((err) => {
        console.log(err);
        res.send(err);
    })
});



module.exports = route;
