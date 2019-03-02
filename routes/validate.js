const express = require('express')
const route = express.Router();
const db = require('../db/models').db;
const fs = require('fs');
const cmd=require('node-cmd');



const { exec } = require("child_process");



route.get('/validate_trans', (req, res) => {
    
    console.log(req);

    db.query("SELECT prop_id ,second_party_id,first_party_1,property_of,Property_price FROM transaction_master where registration_number  ='"+req.query.registration_no+"';").then((trans_data) => {
        db.query("SELECT Area FROM Property_master where Property_id = '"+trans_data[0][0].prop_id +"';").then((prop_data) => {
            console.log(prop_data);
            db.query("SELECT Cost_per_sq_feet FROM Locality_Master where Locality_id = '"+prop_data[0][0].locality_id +"';").then((locality_data) => {
                db.query("SELECT pan_number FROM  buyer_seller_master where aadhar_number = '"+trans_data[0][0].first_party_1 +"';").then((pan_data) => {
                    db.query("SELECT Income_1_year_back,Income_2_year_back, Income_3_year_back,Income_4_year_back,Income_5_year_back,source_of_income_1,source_of_income_2 ,source_of_income_3,Inherited_prop_cost,val_prop_sold,total_price_all_properties FROM  PAN_table where pan_no = '"+pan_data[0][0].pan_number +"';").then((pan_table_data) => {
                        db.query("SELECT cost_persqfoot,area_property FROM  Aadhar_table where aadhar_card_no = '"+trans_data[0][0].first_party_1 +"';").then((aadhar_table_data) => {
                            db.query("SELECT incoming_1,incoming_2,incoming_5,incoming_10,incoming_20,outgoing_1,outgoing_2,outgoing_5,outgoing_10,outgoing_20,is_loan_taken,loan_how_much ,lender,loan_rate_of_interest FROM Bank_table where pan_card_no = '"+pan_data[0][0].pan_number +"';").then((bank_table_data) => {

                                let textToFile="";
                                console.log(prop_data);
                                textToFile+=prop_data[0][0].area+'\n';
                                textToFile+=trans_data[0][0].property_price+"\n";
                                textToFile+=trans_data[0][0].property_of+"\n";
                                textToFile+=pan_table_data[0][0].total_price_all_properties+"\n";
                                textToFile+=aadhar_table_data[0][0].cost_persqfoot+"\n";
                                textToFile+=aadhar_table_data[0][0].area_property+"\n";
                                textToFile+=bank_table_data[0][0].is_loan_taken+"\n";
                                textToFile+=bank_table_data[0][0].lender+"\n";
                                textToFile+=bank_table_data[0][0].loan_rate_of_interest+"\n";
                                textToFile+=bank_table_data[0][0].loan_how_much+"\n";
                                textToFile+=pan_table_data[0][0].source_of_income_1+"\n";
                                textToFile+=pan_table_data[0][0].source_of_income_2+"\n";
                                textToFile+=pan_table_data[0][0].source_of_income_3+"\n";
                                textToFile+=pan_table_data[0][0].inherited_prop_cost+"\n";
                                textToFile+=pan_table_data[0][0].val_prop_sold+"\n";
                                textToFile+=pan_table_data[0][0].income_1_year_back+"\n";
                                textToFile+=pan_table_data[0][0].income_2_year_back+"\n";
                                textToFile+=pan_table_data[0][0].income_3_year_back+"\n";
                                textToFile+=pan_table_data[0][0].income_4_year_back+"\n";
                                textToFile+=pan_table_data[0][0].income_5_year_back+"\n";
                                textToFile+=bank_table_data[0][0].incoming_1+"\n";
                                textToFile+=bank_table_data[0][0].incoming_2+"\n";
                                textToFile+=bank_table_data[0][0].incoming_5+"\n";
                                textToFile+=bank_table_data[0][0].incoming_10+"\n";
                                textToFile+=bank_table_data[0][0].incoming_20+"\n";
                                textToFile+=bank_table_data[0][0].outgoing_1+"\n";
                                textToFile+=bank_table_data[0][0].outgoing_2+"\n";
                                textToFile+=bank_table_data[0][0].outgoing_5+"\n";
                                textToFile+=bank_table_data[0][0].outgoing_10+"\n";
                                textToFile+=bank_table_data[0][0].outgoing_20+"\n";
                                
                                fs.appendFile('/Users/anchalgarg/Desktop/WORK/SIH 2019/PropSafe/routes/test1.txt', textToFile , (err) => {
                                if (err) throw err;

                                    //exec("Fls", (error, stdout, stderr) => console.log("HELLO"+error));

                                    cmd.get(
                                        'python model.py',
                                        function(err, data, stderr){
                                            console.log('the current working dir is : ')
                                        }
                                    );

                                    cmd.get(
                                        'g++ -c ~/Users/anchalgarg/Desktop/WORK/SIH 2019/PropSafe/routes/first.cpp',
                                        function(err, data, stderr){
                                            console.log('the current working dir is : ',data)
                                        }
                                    );

                                        fs.open("/Users/anchalgarg/Desktop/WORK/SIH 2019/PropSafe/routes/a.out",(err)=>{

                                        console.log(err);

                                    });

                                   //exec("./a.out", (error, stdout, stderr) => console.log("HELLO"+error));
                                    //console.log('The "data to append" was appended to file!');
                                });

                                fs.readFile('/Users/anchalgarg/Desktop/WORK/SIH 2019/PropSafe/routes/file1.txt', 'utf-8', (err, data) => {
                                    if (err) throw err;

                                    // Converting Raw Buffer to text
                                    // data using tostring function.
                                    console.log(data);
                                    res.send(data);
                                    
                                })
                            });
                        });

                    });
                });
            });
        });

    });



    });

module.exports = route;
