$(document).ready(() => {
    let email_pass=new Object();


    $.get('/',function () {
        console.log("rr");
    });


    $('#register').click(() => {
        console.log("Reached");
        email_pass.email=$('#email').val();
        email_pass.pass=$('#pass').val();
        email_pass.govt_id=$('#govt_id').val();
        email_pass.phone=$('#phone').val();
        email_pass.aadhar_card_no=$('#aadhar_card_no').val();


        if (!($('#email').val()) || !($('#pass').val()) || !$('#govt_id').val()||!$('#phone').val()||!$('#aadhar_card_no').val() ||($('#pass').val())!=($('#repass').val()) )
            console.log("error: Fill All the details");
        else
        {
            console.log("Reached");
            $.post('/api/register_govt/email_pass',email_pass,function (data,status,xhr) {
                console.log(data);
                window.location.href = "/register_govt_official"

            })
        }
    });
});