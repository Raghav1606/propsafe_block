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
	console.log(req.query);
    db.query("INSERT into transaction_master values('"+req.query.registraion_no+"','"+req.query.registraion_date+"','123','123','123','"+req.query.property_id+"','"+req.query.deed_id+
	"','123','"+req.query.sro_office+"','"+req.query.locality_id+"','"+req.query.book_no+"','"+req.query.mode_of_payment+"','"+
	req.query.buyer_id+"','pending','self',"+req.query.price+");").then((gates) => {
         res.send("success");
    })
});

route.post('/add',(req,res)=>{
    console.log(res.body);
    db.query("INSERT into add_land_master (owner_id,owner_name,locality_id , current_status ,address, area, status ) VALUES ( '"+req.body.owner_id+"','"+req.body.ownerName+"','"+req.body.locality_id+"','"+req.body.current_status+"','"+req.body.address+"','"+req.body.area+"','pending');").then((gates)=>{
        res.send("success");
    })

});

route.post('/validateAddLand',(req,res)=>{
    console.log(req.body);
    db.query("update add_land_master set status='validated' where registration_no='"+req.body.id+"';").then((gates)=>{
        res.send("success");
    })

});
route.post('/validateTransferLand',(req,res)=>{
    console.log(req.body);
    db.query("update transaction_master set status='validated' where registration_number='"+req.body.id+"';").then((gates)=>{
        res.send("success");
    })

});



route.get('/prop_history', (req, res) => {
    db.query("SELECT * FROM add_land_master where status='validated';").then((gates) => {
        console.log("Regno");
        console.log(gates[0]);
        res.send(gates[0]);
    })
});

route.get('/propPending', (req, res) => {
    db.query("SELECT * FROM add_land_master where status='pending';").then((gates) => {
        console.log("Regno");
        console.log(gates[0]);
        res.send(gates[0]);
    })
});

route.get('/landPending', (req, res) => {
    db.query("SELECT * FROM transaction_master where status='pending';").then((gates) => {
        console.log("Regno");
        console.log(gates[0]);
        res.send(gates[0]);
    })
});


route.get('/record', (req, res) => {
    db.query("SELECT * FROM transaction_master where status='validated';").then((gates) => {
        console.log("Regno");
        console.log(gates[0]);
        res.send(gates[0]);
    })
});


module.exports = route;
