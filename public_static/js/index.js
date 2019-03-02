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
    
    
    $('#validate_trans').click(function () {
    selectedAccount = $('#options').val();
    console.log(selectedAccount);
      console.log("HI");
      
      var selectedAccount = 0xfb01b6be238450b81da93a484181026821441964;
    $.post('/setValidator', {account : selectedAccount}, function (response) {
        console.log("done hai :)"+response);

    })  
      
  })
    
    
    
    


});