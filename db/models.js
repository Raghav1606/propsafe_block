const Sequelize = require('sequelize');
// const DATABASE_URL = ('postgres://' + secret.DB_USER + ":" + secret.DB_PASSWORD + "@" + secret.DB_HOST + ":5432/" + secret.DATABASE);

const db = new Sequelize(
    'airportdb',
    'airportuser',
    'airportpass',
    {
        dialect: 'postgres',
        host: 'localhost'
    });

db.sync({alter: true}).then(() => console.log("Database Ready"));


module.exports = {
    db: db
};
