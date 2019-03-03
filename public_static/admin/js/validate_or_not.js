$(document).ready(() => {
   
    $('#validate').click(() => {
        console.log("Reached");
            
             $.post('/validateTransferLandTransaction',{index: $('#id').val()},function (res) {
                //writeCookie("govt",$('#email').val(),10);
                 
                        alert("VALIDATED");
                        window.location.href = "/";
                 
            });
    });
    
    $('#validate1').click(() => {
        console.log("Reached");
            
             $.post('/validateAddLandTransaction',{index: $('#id1').val()},function (res) {
                //writeCookie("govt",$('#email').val(),10);
                 
                        alert("VALIDATED");
                        window.location.href = "/";
                 
            });
    });
    
    $('#register').click(() => {
        window.location.href = "/register_govt_official"
    });
    
});
