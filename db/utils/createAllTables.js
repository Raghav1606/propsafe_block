const db = require('/Users/anchalgarg/Desktop/WORK/SIH 2019/PropSafe/db/models.js').db;
const queries = require('/Users/anchalgarg/Desktop/WORK/SIH 2019/PropSafe/db/queries');


db.query(queries.transactions1.createTable).then((data) => {
    db.query(queries.govt1.createTable).then((data) => {
        console.log("HEY");
    });
});