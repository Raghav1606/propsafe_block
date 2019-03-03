$(document).ready(() => {
    $('#login').click(() => {
        console.log("Reached");
            
             $.post('/api/login_govt/email_pass',{email: $('#email').val(),pass: $('#pass').val()},function (res) {
                //writeCookie("govt",$('#email').val(),10);
                 
                if(res === "Successful Login"){
                    var ethu_id = 1;//////////////fetch from database
                    $.get('/getAccounts',{account : ethu_id}, function (res) {
                       // alert("try"+res);
                        window.location.href = "/";
                    });
                    
                    //window.location.href="/start_trans";
                }else
                    alert("Failed");
                 
            });
    });
    
    $('#register').click(() => {
        window.location.href = "/register_govt_official"
    });
    
});