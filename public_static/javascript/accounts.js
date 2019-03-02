
$(document).ready(function () { //as soon as page opens , this function will be called
  var curraccount;
  var selectedAccount;
  $.get('/getAccounts', function (response) {   //calls get account from server.js
    for(let i = 0; i < response.length; i++){
    console.log(response[i]);
      curraccount = response[i];
      $('#options').append("<option value='"+curraccount+"'>"+curraccount+"</option>");
    }
  })

  $('#submit').click(function () {
    selectedAccount = $('#options').val();
    console.log(selectedAccount);
      console.log("HI");
    $.post('/getBalance', {account : selectedAccount}, function (response) {
      $('.select').removeClass("active");
      $('.send').addClass("active");
      $('#account').text(selectedAccount);
      $('#balance').text(response[0]);
      var current_account_index = response[1].indexOf(selectedAccount);
      response[1].splice(current_account_index,1); //remove the selected account from the list of accounts you can send to.
      $('#all-accounts').addClass("active");
      var list= $('#all-accounts > ol');
      for(let i=0;i< response[1].length;i++){
        li="<li>"+response[1][i]+"</li>";
        list.append(li)
      }


    })
      
      
    $.post('/setValidator', {account : selectedAccount}, function (response) {
        console.log("done hai :)"+response);

    })  
      
  })

  $('#send').click(function () {
    $('#status').text("Sending...");
    let amount = $('#amount').val();
    let receiver = $('#receiver').val();
    $.post('/sendCoin', {amount : amount, sender : selectedAccount, receiver : receiver}, function (response) {
      $('#balance').text(response);
      $('#status').text("Sent!!");
    })
  });
})
