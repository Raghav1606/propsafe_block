const express = require('express')
const route = express.Router();
const db = require('../db/models').db;


route.get('/login_buy_sell', (req, res) => {
    db.query("SELECT * FROM buyer_seller_master where email_id = "+req.query.email+"and password = "+req.query.pass+";").then((list) => {
        console.log(list);
        if(list[0])
        {
            res.send("Successful Login");
        }

    }).catch((err) => {
        console.log(err);
        res.send(err);
    })
})

module.exports = route;
