const createTable = `
   create table transaction_master (Registration_number varchar(20), reg_date date,first_party_1 varchar(100),first_party_2 varchar(100),first_party_3 varchar(100), prop_id varchar(100),deed_id varchar(100), subdeed_id varchar(100), sro_office_id varchar(100), locality_id varchar(100), book_no int, mode_of_payment varchar(100),second_party_id varchar(100),status varchar(100),property_of varchar(50),PRIMARY KEY (Registration_number));
`

const dropTable = `
  DROP TABLE IF EXISTS govt_official_master;
`


module.exports = {
    createTable,
    dropTable
}