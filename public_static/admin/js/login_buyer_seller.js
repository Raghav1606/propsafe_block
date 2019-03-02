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
            $.post('/api/login_buyer_seller/email_pass',email_pass,function (data,status,xhr) {
                console.log(data);
                window.location.href = "/start_trans"

            }).catch(function (err) {
                console.log("ERROR");
            })
        }
    });
});