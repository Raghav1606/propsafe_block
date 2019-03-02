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


app.listen(4000, () => { console.log("Server running on http://localhost:4000")})
