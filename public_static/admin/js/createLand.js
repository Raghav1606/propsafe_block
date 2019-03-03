
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
            data1.owner_id=$("#owner_id").val();
            data1.ownerName=$("#ownerName").val();
            data1.locality_id=$("#locality_id").val();
            data1.current_status=$("#currentStatus").val();
            data1.address=$("#address").val();
            data1.area=$("#area").val();
            
            $.post( "/addLandTransaction", data1 ).done(function( data ) {
                                    
                                    
                    window.location.href="/validate_opage";
                                    
            });
                                    
                    
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

        });

});
