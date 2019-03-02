const db = require('./../models');
const queries = require('../queries');

db.query(queries.airport.dropTable).then((data) => {

});

db.query(queries.airlines.dropTable).then((data) => {

});

