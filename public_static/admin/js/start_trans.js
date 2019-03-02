
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

    console.log(readCookie("govt"));
    
   /* if(readCookie("govt")=='')
    {
        window.location.href = "/login_govt_official";
    }
    else {*/
        $('#submit').click(() => {

            console.log("HEY");

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


            $.ajax({
                        url: '/api/transactions/addNewTrans',

                        data: data1,
                        method: 'GET'
                    }).done(function (msg) {
                        if(msg==="success")
                        {
                            $.get( "/api/validate/validate_trans", data1 )
                                .done(function( data ) {

                                    window.location.href="/validate_page"+"&data="+data;
                                    
                                });
                                    
                        }
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
                    })
                

            // $.ajax({
            //     url: "/api/validate/validate_trans",
            //     type: "get",
            //     data: {
            //         registration_no: $('#registration_no').val(),
            //        
            //     },
            //     success: function(response) {
            //         //Do Something
            //         console.log(response);
            //        // window.location.href = "/validated_or_not";
            //     },
            //     error: function(xhr) {
            //         throw xhr;
            //     }
            // });
           //
        });
   // }
});
