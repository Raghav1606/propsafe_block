const express = require('express')
const route = express.Router();
const db = require('../db/models').db;
const fs = require('fs');
const cmd=require('node-cmd');



const { exec } = require("child_process");



route.get('/validate_trans', (req, res) => {
    
    console.log(req);

    db.query("SELECT Mode_of_payment, deed_id, prop_id ,second_party_id,first_party_1,property_of,Property_price FROM transaction_master where registration_number  ='"+req.query.registration_no+"';").then((trans_data) => {
        db.query("SELECT Area FROM Property_master where Property_id = '"+trans_data[0][0].prop_id +"';").then((prop_data) => {
            console.log(prop_data);
            db.query("SELECT Locality_id ,Cost_per_sq_feet FROM Locality_Master where Locality_id = '"+prop_data[0][0].locality_id +"';").then((locality_data) => {
                db.query("SELECT pan_number FROM  buyer_seller_master where aadhar_number = '"+trans_data[0][0].first_party_1 +"';").then((pan_data) => {
                    db.query("SELECT Since_when_rental ,Is_rental_income ,No_of_properties_owned ,Is_prop_sold, Income_1_year_back,Income_2_year_back, Income_3_year_back,Income_4_year_back,Income_5_year_back,source_of_income_1,source_of_income_2 ,source_of_income_3,Inherited_prop_cost,val_prop_sold,total_price_all_properties FROM  PAN_table where pan_no = '"+pan_data[0][0].pan_number +"';").then((pan_table_data) => {
                        db.query("SELECT cost_persqfoot,area_property FROM  Aadhar_table where aadhar_card_no = '"+trans_data[0][0].first_party_1 +"';").then((aadhar_table_data) => {
                            db.query("SELECT no_bank_accounts, incoming_1,incoming_2,incoming_5,incoming_10,incoming_20,outgoing_1,outgoing_2,outgoing_5,outgoing_10,outgoing_20,is_loan_taken,loan_how_much ,lender,loan_rate_of_interest FROM Bank_table where pan_card_no = '"+pan_data[0][0].pan_number +"';").then((bank_table_data) => {

                                let textToFile="";
                                let textToFile1="";
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



                                console.log("ek lakh")
                                textToFile1+=trans_data[0][0].property_of+"\n";
                                textToFile1+="2\n"
                                textToFile1+="7\n";
                                textToFile1+=aadhar_table_data[0][0].Rented_owned+"\n";
                                textToFile1+=aadhar_table_data[0][0].current_locality_id+"\n";
                                textToFile1+=aadhar_table_data[0][0].area_property+"\n";
                                textToFile1+=trans_data[0][0].deed_id+"\n";
                                textToFile1+=trans_data[0][0].Cost_per_sq_feet+"\n";
                                textToFile1+=locality_data[0][0].locality_id+"\n";
                                textToFile1+=prop_data[0][0].area+'\n';
                                textToFile1+=trans_data[0][0].Mode_of_payment+"\n";
                                textToFile1+="5\n";
                                textToFile1+=trans_data[0][0].property_price+"\n";
                                textToFile1+="0\n";
                                textToFile1+=pan_table_data[0][0].income_1_year_back+"\n";
                                textToFile1+=pan_table_data[0][0].income_2_year_back+"\n";
                                textToFile1+=pan_table_data[0][0].income_3_year_back+"\n";
                                textToFile1+=pan_table_data[0][0].income_4_year_back+"\n";
                                textToFile1+=pan_table_data[0][0].income_5_year_back+"\n";
                                textToFile1+=pan_table_data[0][0].source_of_income_1+"\n";
                                textToFile1+=pan_table_data[0][0].source_of_income_2+"\n";
                                textToFile1+=pan_table_data[0][0].source_of_income_3+"\n";
                                textToFile1+=pan_table_data[0][0].No_of_properties_owned+"\n";
                                textToFile1+=pan_table_data[0][0].Is_rental_income+"\n";
                                textToFile1+=pan_table_data[0][0].Since_when_rental+"\n";
                                textToFile1+="50\n";
                                textToFile1+="50000000\n";
                                textToFile1+="0\n";
                                textToFile1+=pan_table_data[0][0].inherited_prop_cost+"\n";
                                textToFile1+=pan_table_data[0][0].Is_prop_sold+"\n";
                                textToFile1+=pan_table_data[0][0].val_prop_sold+"\n";
                                textToFile1+=pan_table_data[0][0].total_price_all_properties+"\n";
                                textToFile1+=pan_table_data[0][0].income_1_year_back+"\n";
                                textToFile1+=bank_table_data[0][0].is_loan_taken+"\n";
                                textToFile1+="50\n";
                                textToFile1+="1\n";
                                textToFile1+=bank_table_data[0][0].loan_rate_of_interest+"\n";
                                textToFile1+=bank_table_data[0][0].no_bank_accounts+"\n";
                                textToFile1+=bank_table_data[0][0].incoming_1+"\n";
                                textToFile1+=bank_table_data[0][0].incoming_2+"\n";
                                textToFile1+=bank_table_data[0][0].incoming_5+"\n";
                                textToFile1+=bank_table_data[0][0].incoming_10+"\n";
                                textToFile1+=bank_table_data[0][0].incoming_20+"\n";

                                fs.appendFile('routes/jobs.txt', textToFile1 , (err) => {
                                if (err) throw err;

                                    //exec("Fls", (error, stdout, stderr) => console.log("HELLO"+error));

                                    cmd.get(
                                        'python model.py',
                                        function(err, data, stderr){
                                            console.log('the current working dir is : ')
                                        }
                                    );

                                   //exec("./a.out", (error, stdout, stderr) => console.log("HELLO"+error));
                                    //console.log('The "data to append" was appended to file!');
                                });



                                fs.appendFile('routes/test1.txt', textToFile , (err) => {
                                if (err) throw err;

                                    //exec("Fls", (error, stdout, stderr) => console.log("HELLO"+error));

                                    cmd.get(
                                        'g++ -c routes/first.cpp',
                                        function(err, data, stderr){
                                            console.log('the current working dir is : ',data)
                                        }
                                    );

                                        fs.open("routes/a.out",(err)=>{

                                        console.log(err);

                                    });

                                   //exec("./a.out", (error, stdout, stderr) => console.log("HELLO"+error));
                                    //console.log('The "data to append" was appended to file!');
                                });

                                fs.readFile('routes/file1.txt', 'utf-8', (err, data) => {
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
