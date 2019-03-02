const route = require('express').Router();

route.use('/login_govt', require('./login_govt_official'));
route.use('/register_govt',require('./register_govt_official'));
route.use('/transactions',require('./transactions'));
route.use('/validate',require('./validate'));


module.exports = route;