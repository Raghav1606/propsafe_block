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

app.use('/block', express.static(__dirname + '/public_static/admin/block.html'))




const port = 4000 || process.env.PORT;
const Web3 = require('web3');
const truffle_connect = require('./connection/app.js');
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.post('/setValidator', (req, res) => {
  console.log("**** setting val ****");
  console.log(req.body);
  let currentAcount = req.body.account;
  truffle_connect.setValidator(currentAcount, (answer) => {
    console.log(answer+"OKOKOK");
      res.send(answer);
  });
});


app.listen(4000, () => { console.log("Server running on http://localhost:4000")})
