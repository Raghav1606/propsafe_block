
$(document).ready(() => {

    function readCookie(name) {
        let i, c, ca, nameEQ = name + "=";
        ca = document.cookie.split(';');
        for (i = 0; i < ca.length; i++) {
            c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1, c.length);
            }
            if (c.indexOf(nameEQ) == 0) {
                return c.substring(nameEQ.length, c.length);
            }
        }
        return '';
    }

    //console.log(readCookie("govt"));
    

    $('#submit').click(() => {

            console.log("HEY submit create trans");

            let data1={};
            data1.registraion_no=$("#registration_no").val();
            data1.registraion_date=$("#registration_date").val();
            data1.buyer_id=$("#buyer_id").val();
            data1.property_id=$("#Property_id").val();
            data1.deed_id=$("#Deed_id").val();
            data1.sro_office=$("#SRO_office_id").val();
            data1.locality_id=$("#Locality_id").val();
            data1.book_no=$("#Book_no").val();
            data1.mode_of_payment=$("#Mode_of_payment").val();
            data1.seller_id=$("#Seller_id").val();
            data1.status=$("#Status").val();
            data1.price = $("#price").val();
            
            $.get( "/api/validate/validate_trans", data1 ).done(function( data ) {
                                    
                                    
                    window.location.href="/validate_page"+"&data="+data;
                                    
            });
        /*
            $.ajax({
                        url: '/api/transactions/addNewTrans',

                        data: data1,
                        method: 'GET'
                    }).done(function (res) {
                    if(res === "success")
                    {
                           
                           /* $.post( "/transferLandTransaction", data1 ).done(function( data ) {
                                    
                                    
                                    window.location.href="/validate_opage";
                                    
                                });
                            
                            
                                    
                    }*/
                        // console.log(msg);
                        // if (msg === "Succesful Login") {
                        //     console.log(data);
                        //     writeCookie("govt",$('#email').val(),10);
                        //     window.location.href="/register"
                        // }
                        // else {
                        //     console.log("could not add the rows right now")
                        //     window.location.href="/start_trans"
                        // }
                  //  });
                

        });

});
