$(document).ready(() => {

    $('#login_home').click(() => {
            window.location.href = "/login"
    });

    $('#register_home').click(() => {

            window.location.href = "/register"
    });
    
    $('#start_trans').click(() => {

        window.location.href = "/login_govt_official"
    });
    $('#search_registry').click(() => {

        window.location.href = "/search_registry"
    });
    
    $('#validate_trans').click(() => {
        $.post('/getAccounts', {}, function (response) {
            console.log("done hai :)");
        })
        /*var selectedAccount ='0xeac5a6b2b9ffe4459165b8da862c56fe0bfe93c2';
        $.post('/setValidator', {account : selectedAccount}, function (response) {
        console.log("done hai :)"+response);

    })  */
        
    });


});
