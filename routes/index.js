const route = require('express').Router();

route.use('/login_govt', require('./login_govt_official'));
route.use('/register_govt',require('./register_govt_official'));
route.use('/search_registry',require('./search_registry'));
route.use('/start_trans',require('./start_trans'));
route.use('/transactions',require('./transactions'));
route.use('/block',require('./block'));

module.exports = route;
