const createTable = `
  CREATE TABLE IF NOT EXISTS govt_official_master(
    govt_ID     varchar(100)    NOT NULL,
    phone_number   varchar(15)    NOT NULL,
    aadhar_card_number varchar(50) NOT NULL,
    password varchar(50) NOT NULL,
    email_id varchar(50) NOT NULL,
    PRIMARY KEY (govt_ID) 
  );
`

// noinspection JSAnnotator
const dropTable = `
  DROP TABLE IF EXISTS govt_official_master;
`


module.exports = {
    createTable,
    dropTable
}