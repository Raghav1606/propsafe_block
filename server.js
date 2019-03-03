const express = require('express');
const app = express();
const db = require('./db/models').db;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', require('./routes/index'))

app.use(express.static(__dirname + '/public_static'))
app.use('/login_govt_official', express.static(__dirname + '/public_static/admin/login_govt_official.html'))
app.use('/register_govt_official', express.static(__dirname + '/public_static/admin/register_govt_official.html'))
app.use('/search_registry', express.static(__dirname + '/public_static/admin/search_registry.html'))
app.use('/start_trans', express.static(__dirname + '/public_static/admin/start_trans.html'))
app.use('/pending_trans', express.static(__dirname + '/public_static/admin/pending_trans.html'));
app.use('/validate_or_not', express.static(__dirname + '/public_static/admin/validate_or_not.html'));
app.use('/validate_opage', express.static(__dirname + '/public_static/admin/validate_or_not.html'));
app.use('/addLandT', express.static(__dirname + '/public_static/admin/addLandT.html'));
app.use('/createLand', express.static(__dirname + '/public_static/admin/createLand.html'));



const port = 4000 || process.env.PORT;
const Web3 = require('web3');
const truffle_connect = require('./connection/app.js');
const bodyParser = require('body-parser');

var accounts;


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());



app.get('/getAccounts', (req, res) => {
 console.log("**** GET /getAccounts lalalalal****");
 let currentAcount = req.query.account;
    console.log(currentAcount+"ACCOUNT");

    truffle_connect.start(currentAcount, (answer) =>{
     
     accounts = answer;
     console.log(accounts);
     truffle_connect.setValidator( (answer) => {
    console.log(answer+"OKOKOK");
      res.send(answer);
  });
 });
    
 
    
});



//*********************************    ACCESS CONTROL   *************************************

app.post('/setValidator', (req, res) => {
  console.log("**** SetValidator val ****");
  console.log(req.body);
  truffle_connect.setValidator( (answer) => {
    console.log(answer+"OKOKOK");
      res.send(answer);
  });
});

app.post('/setTransactor', (req, res) => {
  console.log("**** Set Transactor val ****");
  console.log(req.body);
  let currentAcount = accounts[req.body.account]
  truffle_connect.setTransactor(currentAcount, (answer) => {
    console.log(answer+"OKOKOK");
      res.send(answer);
  });
});



//***********************************************************************************************


//*********************************    LAND REGISTRY    *********************************************

//addLandTransaction: function(ownerAddress,coordinates,ownerName,location, callback)



app.post('/addLandTransaction', (req, res) => {
  console.log("**** Set Transactor val ****");
  console.log(req.body);
    
  var owner_id = req.body.owner_id;
  var ownerName = req.body.ownerName;
  var locality_id = req.body.locality_id;
  var current_status = req.body.current_status;
  var address = req.body._address;
  var area = req.body.area;

  
  truffle_connect.addLandTransaction(owner_id, ownerName, locality_id, current_status, address, area, (answer) => {
    console.log(answer+"OKOKOKyfffyyf");
      
    truffle_connect.getAddLandTransactionsA( (answer) => {
        console.log("abc"+answer+"abc");
      res.send(answer);
    });
  });
});



//validateAddLandTransaction: function(index, callback)
app.post('/validateAddLandTransaction', (req, res) => {
  console.log("**** validateAddLandTransaction val ****");
  console.log(req.body);
  let index = req.body.index;
  truffle_connect.validateAddLandTransaction(0, (answer) => {
    console.log(answer+"OKOKOK");
      res.send(answer);
  });
});

/////////////


//getAddLandTransaction: function(index, callback) 
app.post('/getAddLandTransaction', (req, res) => {
  console.log("**** getAddLandTransaction val ****");
  console.log(req.body);
  let index = req.body.index;
  truffle_connect.getAddLandTransaction(index, (answer) => {
    console.log(answer+"OKOKOK");
      res.send(answer);
  });
});


//transferLandTransaction: function(newOwner,newOwnerName,landIndex, callback)

//_date, landIndex, newLandOwner, newLandOwnerName, ids, 


//function transferLandTransaction(string _date, uint landIndex, address newLandOwner,string newLandOwnerName, uint ids, 
  //  string mode_of_payment, uint property_Price, string property_for)
app.post('/transferLandTransaction', (req, res) => {
  console.log("**** transferLandTransaction val ****");
  console.log(req.body);
    /*
  let _date = req.body._date;
  let newLandOwner = req.body.newLandOwner;
  let landIndex = req.body.landIndex;
  let newLandOwnerName = req.body.newLandOwnerName;
  let ids = req.body.ids;
  let mode_of_payment = req.body.mode_of_payment;
  let property_Price = req.body.property_Price;
  let property_for = req.body.property_for;*/
  var _date = req.body.registraion_date;
  var newLandOwner = accounts[1];//req.body.buyer_id;
  var landIndex = 1;
  var newLandOwnerName = "raghav";
  var ids = 192836362772;
  var mode_of_payment = req.body.mode_of_payment;
  var property_Price = 100000;
  var property_for = "SELF"; 


  truffle_connect.transferLandTransaction(_date, landIndex, newLandOwner, newLandOwnerName, ids, 
     mode_of_payment, property_Price, property_for, (answer) => {
    console.log(answer+"OKOKOK");
      res.send(answer);
  });
});



//validateTransferLandTransaction: function(index, callback)


app.post('/validateTransferLandTransaction', (req, res) => {
  console.log("**** validateTransferLandTransaction val ****");
  console.log(req.body);
  let index = req.body.index;
  truffle_connect.validateTransferLandTransaction(index, (answer) => {
    console.log(answer+"OKOKOK");
      res.send(answer);
  });
});


// getTransferLandTransaction: function(index, callback)

app.post('/getTransferLandTransaction', (req, res) => {
  console.log("**** getTransferLandTransaction val ****");
  console.log(req.body);
  let index = req.body.index;
  truffle_connect.getTransferLandTransaction(index, (answer) => {
    console.log(answer+"OKOKOK");
      res.send(answer);
  });
});

///getLand: function(index, callback)

app.post('/getLandById', (req, res) => {
  console.log("**** getLandById val ****");
  console.log(req.body);
  let index = req.body.index;
  truffle_connect.getLandById(index, (answer) => {
    console.log(answer+"OKOKOK");
      res.send(answer);
  });
});



//getAllLand: function(callback)
app.post('/getLandA', (req, res) => {
  console.log("**** getLandA val ****");
  console.log(req.body);
  truffle_connect.getLandA( (answer) => {
    console.log(answer+"OKOKOK");
      res.send(answer);
  });
});


app.post('/getAddLandTransactionsA', (req, res) => {
  console.log("**** getAddLandTransactionsA val ****");
  console.log(req.body);
  truffle_connect.getAddLandTransactionsA( (answer) => {
    console.log(answer+"OKOKOK");
      res.send(answer);
  });
});

app.post('/getTransferLandTransactionsA', (req, res) => {
  console.log("**** getTransferLandTransactionsA val ****");
  console.log(req.body);
  truffle_connect.getTransferLandTransactionsA( (answer) => {
    console.log(answer+"OKOKOK");
      res.send(answer);
  });
});


app.post('/getLandByOwner', (req, res) => {
  console.log("**** getLandbyOwner ****");
  console.log(req.body);
  let owner_id = req.body.owner_id;
  truffle_connect.getLandByOwner(owner_id, (answer) => {
    console.log(answer+"OKOKOK");
      res.send(answer);
  });
});



//*************************************************************************************************






//app.listen(4000, () => { console.log("Server running on http://localhost:4000")})
app.listen(port, () => {

 // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
 truffle_connect.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

 console.log("Express Listening at http://localhost:" + port);

});
