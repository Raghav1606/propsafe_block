$(document).ready(() => {
    let email_pass=new Object();


    $.get('/',function () {
       console.log("rr");
    });


    $('#login').click(() => {
        console.log("Reached");
        email_pass.email=$('#email').val();
        email_pass.pass=$('#pass').val();


        if (!($('#email').val()) || !($('#pass').val()))
            console.log("error");
        else
        {
            console.log("Reached");
            $.post('/api/login_govt/email_pass',email_pass,function (data,status,xhr) {
                console.log("YEAH");
                console.log(data);
                if(data.rowCount === 1)
                    window.location.href = "/start_trans"
                
            }).catch(err=>{
                throw err;
            })
        }
    });
    $('#register').click(() => {
        window.location.href = "/register_govt_official"
    })
});