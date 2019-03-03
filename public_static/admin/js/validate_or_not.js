$(document).ready(() => {
    
    console.log(localStorage.getItem('testObject'));
    document.getElementById("result").innerHTML =localStorage.getItem('testObject');
    document.getElementById("result").style.color="white";
     
    
    $.get('/api/transactions/propPending',function(res){
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
        
                document.getElementById("table_2").innerHTML=x;
    });
    
    
    $.get('/api/transactions/landPending',function(res){
        console.log("props"+res);
        let x="";
        x+="<tr><th> Registration_no </th>"
                +"<th> Registration Date </th>"
                +"<th> Seller </th>"
                +"<th> Locality ID </th>"
                +"<th> Property_ID </th>"
                +"<th> Deed ID </th>"
                +"<th> Subdeed ID </th>"
                +"<th> SRO Office ID </th>"
                +"<th> Book No.</th>"
                +"<th> Mode of Payment </th>"
                +"<th>Buyer </th>"
                +"<th> Status </th>"
                +"<th> Property_of </th>"
                +"<th> price </th></tr>";
        
        for(let i=0;i<res.length;i++)
            {
                x+="<tr><td>"+res[i].registration_number+"</td>"
                +"<td>"+res[i].reg_date+"</td>"
                +"<td>"+res[i].first_party_1+"</td>"
                +"<td>"+res[i].locality_id+"</td>"
                +"<td>"+res[i].prop_id+"</td>"
                +"<td>"+res[i].deed_id+"</td>"
                +"<td>"+res[i].subdeed_id+"</td>"
                +"<td>"+res[i].sro_office_id+"</td>"
                +"<td>"+res[i].book_no+"</td>"
                +"<td>"+res[i].mode_of_payment+"</td>"
                +"<td>"+res[i].second_party_id+"</td>"
                +"<td>"+res[i].status+"</td>"
                +"<td>"+res[i].property_of+"</td>"
                +"<td>"+res[i].property_price+"</td>"
                +"</tr>";
            }
        
                document.getElementById("table_1").innerHTML=x;
    });
    
    
   
    $('#validate').click(() => {
        console.log("Reached");
            
        $.post('/api/transactions/validateTransferLand', {id: $('#id').val()},function (res) {
               // $.post('/validateTransferLandTransaction',{index: $('#id').val()},function (res) {
                //writeCookie("govt",$('#email').val(),10);
                 
                        alert("VALIDATED");
                        window.location.href = "/";
                 
        //    });
                       
            });    
        
    });
    
    $('#validate1').click(() => {
        console.log("Reached");
            
             
        
        $.post('/api/transactions/validateAddLand', {id: $('#id1').val()},function (res) {
                //writeCookie("govt",$('#email').val(),10);
              //   $.post('/validateAddLandTransaction',{index: $('#id1').val()},function (res) {
                //writeCookie("govt",$('#email').val(),10);
                 
                        alert("VALIDATED");
                        window.location.href = "/";
                 
        //    });
                       
            });
    });
    
    $('#register').click(() => {
        window.location.href = "/register_govt_official"
    });
    
});
