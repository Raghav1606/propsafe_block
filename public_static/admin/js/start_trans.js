
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

            $.get( "/api/validate/validate_trans", { registration_no: $('#registration_no').val() } )
                .done(function( data ) {
                    alert( "Data Loaded: " + data );
                });

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
