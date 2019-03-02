

const createTable = `
  CREATE TABLE IF NOT EXISTS buyer_seller_master(
    aadhar_number     varchar(100)    NOT NULL,
    pan_number   varchar(15) ,
    name varchar(50) NOT NULL,
    address varchar(50) NOT NULL,
    phone_number varchar(50) NOT NULL,
    Image varchar(100) ,
    email_id varchar(100),
    aadhar_card_image varchar(100),
    password varchar(100),
    PRIMARY KEY (aadhar_number) 
  );
`

// noinspection JSAnnotator
const dropTable = `
  DROP TABLE IF EXISTS buyer_seller_master;
`


module.exports = {
    createTable,
    dropTable
}