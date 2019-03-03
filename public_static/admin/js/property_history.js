
$(document).ready(() => {
    
    $.get('/api/transactions/prop_history',function(res){
        console.log("props"+res);
        let x="";
        x+="<tr><th> registration_no </th>"
                +"<th> owner_id </th>"
                +"<th> owner_name </th>"
                +"<th> locality_id </th>"
                +"<th> current_status </th>"
                +"<th> address </th>"
                +"<th> area </th>"
                +"<th> status </th></tr>";
        for(let i=0;i<res.length;i++)
            {
                x+="<tr><td>"+res[i].registration_no+"</td>"
                +"<td>"+res[i].owner_id+"</td>"
                +"<td>"+res[i].owner_name+"</td>"
                +"<td>"+res[i].locality_id+"</td>"
                +"<td>"+res[i].current_status+"</td>"
                +"<td>"+res[i].address+"</td>"
                +"<td>"+res[i].area+"</td>"
                +"<td>"+res[i].status+"</td></tr>";
            }
        
                document.getElementById("table_1").innerHTML=x;
    });

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
        
        $.post('/api/transactions/add',data1,function(){
           // $.post( "/addLandTransaction", data1 ).done(function( data ) {
                                    
                                    
                    window.location.href="/validate_opage";
                                    
        //    });
            
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
