const contract = require('truffle-contract');

const metacoin_artifact = require('../build/contracts/MetaCoin.json'); // connects with metacoin.sol
var MetaCoin = contract(metacoin_artifact); //metacoin is a variable of this


//connect hote hi accounts aajate hai using this
module.exports = {
  start: function(callback) {
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    MetaCoin.setProvider(self.web3.currentProvider);

    // Get the initial account balance so it can be displayed.
    self.web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }
      self.accounts = accs;
      self.account = self.accounts[2];

      callback(self.accounts);
    });
      //don't see this till here
  },
    
  refreshBalance: function(account, callback) { //gets the selected account 
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    MetaCoin.setProvider(self.web3.currentProvider);

    var meta;
    MetaCoin.deployed().then(function(instance) {  /// Metacoin.deployed ????
      meta = instance;
      return meta.getBalance.call(account, {from: account});    ///meta.getbalance calls Metacoin.sol and gets balance ..... {from :account ???}
    }).then(function(value) {   //useless lines
        callback(value.valueOf());
    }).catch(function(e) {
        console.log(e);
        callback("Error 404");
    });
  },
    
    setValidator: function(account, callback) { //gets the selected account 
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    MetaCoin.setProvider(self.web3.currentProvider);

    var meta;
    MetaCoin.deployed().then(function(instance) {  /// Metacoin.deployed ????
      meta = instance;
      return meta.setValidator.call(account, {from: account});    ///meta.getbalance calls Metacoin.sol and gets balance ..... {from :account ???}
    }).then(function(value) {   //useless lines
        callback(value.valueOf());
    }).catch(function(e) {
        console.log(e);
        callback("Error 404");
    });
  },
    
    
  sendCoin: function(amount, sender, receiver, callback) {
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    MetaCoin.setProvider(self.web3.currentProvider);

    var meta;
    MetaCoin.deployed().then(function(instance) {
      meta = instance;
      return meta.sendCoin(receiver, amount, {from: sender});
    }).then(function() {
      self.refreshBalance(sender, function (answer) {
        callback(answer);
      });
    }).catch(function(e) {
      console.log(e);
      callback("ERROR 404");
    });
  }
}
