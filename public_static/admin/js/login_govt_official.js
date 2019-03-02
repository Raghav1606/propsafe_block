$(document).ready(() => {
    let email_pass=new Object();


    $.get('/',function () {
       console.log("rr");
    });

    function writeCookie(name,value,days) {
        var date, expires;
        if (days) {
            date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            expires = "; expires=" + date.toGMTString();
        }else{
            expires = "";
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    }


    $('#login').click(() => {
        console.log("Reached");
        email_pass.email=$('#email').val();
        email_pass.pass=$('#pass').val();


        if (!($('#email').val()) || !($('#pass').val()))
            console.log("error");
        else
        {
            console.log("Reached");

            $.ajax({
                url: '/api/login_govt/email_pass',

                data: {
                    email: $('#email').val(),
                    pass: $('#pass').val()

                },
                method: 'POST'
            }).done(function (msg) {
                console.log(msg);
                if (msg === "Succesful Login") {
                    console.log(data);
                    writeCookie("govt",$('#email').val(),10);
                    window.location.href="/register"
                }
                else {
                    console.log("could not add the rows right now")
                    window.location.href="/start_trans"
                }
            })


            // $.post('/api/login_govt/email_pass',email_pass,function (data,status,xhr) {
            //     console.log(data);
            //     writeCookie("govt",$('#email').val(),10);
            //
            // }).catch(err=>{
            //     throw err;
            // })
        }
    });
    $('#register').click(() => {
        window.location.href = "/register_govt_official"
    })
});
