const contract = require('truffle-contract');

const metacoin_artifact = require('../build/contracts/MetaCoin.json'); // connects with metacoin.sol
var MetaCoin = contract(metacoin_artifact); //metacoin is a variable of this


//connect hote hi accounts aajate hai using this
module.exports = {
    
    
    //   ****************************************    ACCESS CONTROL    ************************************************************
    
    
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
    setTransactor: function(account, callback) { //gets the selected account 
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    MetaCoin.setProvider(self.web3.currentProvider);

    var meta;
    MetaCoin.deployed().then(function(instance) {  /// Metacoin.deployed ????
      meta = instance;
      return meta.setTransactor.call(account, {from: account});    ///meta.getbalance calls Metacoin.sol and gets balance ..... {from :account ???}
    }).then(function(value) {   //useless lines
        callback(value.valueOf());
    }).catch(function(e) {
        console.log(e);
        callback("Error 404");
    });
  },
    
    
    
    
    
     
    
    
    //*********************************************************** LANDREGISTRY  ****************************************************************
    
    //addLandTransaction(address _ownerAddress, bytes32[] memory _coordinates, string memory _ownerName, bytes32 _location)
    
    
    addLandTransaction: function(owner_id, ownerName, locality_id, current_status, _address, area, callback) { //gets the selected account 
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    MetaCoin.setProvider(self.web3.currentProvider);

    var meta;
    MetaCoin.deployed().then(function(instance) {  /// Metacoin.deployed ????
      meta = instance;
      
        return meta.addLandTransaction.call(owner_id, ownerName, locality_id, current_status, _address, area, {from: account});    ///meta.getbalance calls Metacoin.sol and gets balance ..... {from :account ???}
    }).then(function(value) {   //useless lines
        callback(value.valueOf());
    }).catch(function(e) {
        console.log(e);
        callback("Error 404");
    });
  },
    
    
    //validateAddLandTransaction(uint _index)
    
    validateAddLandTransaction: function(index, callback) { //gets the selected account 
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    MetaCoin.setProvider(self.web3.currentProvider);

    var meta;
    MetaCoin.deployed().then(function(instance) {  /// Metacoin.deployed ????
      meta = instance;
      
        return meta.validateAddLandTransaction.call(index, {from: account});    ///meta.getbalance calls Metacoin.sol and gets balance ..... {from :account ???}
    }).then(function(value) {   //useless lines
        callback(value.valueOf());
    }).catch(function(e) {
        console.log(e);
        callback("Error 404");
    });
  },
    
//getAddLandTransaction(uint _index) 
    
    getAddLandTransaction: function(index, callback) { //gets the selected account 
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    MetaCoin.setProvider(self.web3.currentProvider);

    var meta;
    MetaCoin.deployed().then(function(instance) {  /// Metacoin.deployed ????
      meta = instance;
      
        return meta.getAddLandTransaction.call(index, {from: account});    ///meta.getbalance calls Metacoin.sol and gets balance ..... {from :account ???}
    }).then(function(value) {   //useless lines
        callback(value.valueOf());
    }).catch(function(e) {
        console.log(e);
        callback("Error 404");
    });
  },
    
    // function transferLandTransaction(address _newLandOwner, string memory _newLandOwnerName, uint _landIndex) 
    
    transferLandTransaction: function(_date, landIndex, newLandOwner, newLandOwnerName, ids, 
     mode_of_payment, property_Price, property_for, callback) { //gets the selected account 
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    MetaCoin.setProvider(self.web3.currentProvider);

    var meta;
    MetaCoin.deployed().then(function(instance) {  /// Metacoin.deployed ????
      meta = instance;
      
        return meta.transferLandTransaction.call(date, landIndex, newLandOwner, newLandOwnerName, ids, 
     mode_of_payment, property_Price, property_for, {from: account});    ///meta.getbalance calls Metacoin.sol and gets balance ..... {from :account ???}
    }).then(function(value) {   //useless lines
        callback(value.valueOf());
    }).catch(function(e) {
        console.log(e);
        callback("Error 404");
    });
  },
    
    
    
    //function validateTransferLandTransaction(uint _index)
    
    validateTransferLandTransaction: function(index, callback) { //gets the selected account 
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    MetaCoin.setProvider(self.web3.currentProvider);

    var meta;
    MetaCoin.deployed().then(function(instance) {  /// Metacoin.deployed ????
      meta = instance;
      
        return meta.validateTransferLandTransaction.call(index, {from: account});    ///meta.getbalance calls Metacoin.sol and gets balance ..... {from :account ???}
    }).then(function(value) {   //useless lines
        callback(value.valueOf());
    }).catch(function(e) {
        console.log(e);
        callback("Error 404");
    });
  },
    
    
    
    //function getTransferLandTransaction(uint _index)
    getTransferLandTransaction: function(index, callback) { //gets the selected account 
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    MetaCoin.setProvider(self.web3.currentProvider);

    var meta;
    MetaCoin.deployed().then(function(instance) {  /// Metacoin.deployed ????
      meta = instance;
      
        return meta.getTransferLandTransaction.call(index, {from: account});    ///meta.getbalance calls Metacoin.sol and gets balance ..... {from :account ???}
    }).then(function(value) {   //useless lines
        callback(value.valueOf());
    }).catch(function(e) {
        console.log(e);
        callback("Error 404");
    });
  },
    
    
    
    //function getLand(uint _index)
    
    getLandById: function(index, callback) { //gets the selected account 
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    MetaCoin.setProvider(self.web3.currentProvider);

    var meta;
    MetaCoin.deployed().then(function(instance) {  /// Metacoin.deployed ????
      meta = instance;
      
        return meta.getLandById.call(index, {from: account});    ///meta.getbalance calls Metacoin.sol and gets balance ..... {from :account ???}
    }).then(function(value) {   //useless lines
        callback(value.valueOf());
    }).catch(function(e) {
        console.log(e);
        callback("Error 404");
    });
  },
    
    
    
    
    //function getLandA()
    getLandA: function(callback) { //gets the selected account 
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    MetaCoin.setProvider(self.web3.currentProvider);

    var meta;
    MetaCoin.deployed().then(function(instance) {  /// Metacoin.deployed ????
      meta = instance;
      
        return meta.getLandA.call({from: account});    ///meta.getbalance calls Metacoin.sol and gets balance ..... {from :account ???}
    }).then(function(value) {   //useless lines
        callback(value.valueOf());
    }).catch(function(e) {
        console.log(e);
        callback("Error 404");
    });
  },
    ///////////////////
    
    getAddLandTransactionsA: function( callback) { //gets the selected account 
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    MetaCoin.setProvider(self.web3.currentProvider);

    var meta;
    MetaCoin.deployed().then(function(instance) {  /// Metacoin.deployed ????
      meta = instance;
      
        return meta.getAddLandTransactionsA.call( {from: account});    ///meta.getbalance calls Metacoin.sol and gets balance ..... {from :account ???}
    }).then(function(value) {   //useless lines
        callback(value.valueOf());
    }).catch(function(e) {
        console.log(e);
        callback("Error 404");
    });
  },
    
    
    
    getTransferLandTransactionsA: function( callback) { //gets the selected account 
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    MetaCoin.setProvider(self.web3.currentProvider);

    var meta;
    MetaCoin.deployed().then(function(instance) {  /// Metacoin.deployed ????
      meta = instance;
      
        return meta.getTransferLandTransactionsA.call( {from: account});    ///meta.getbalance calls Metacoin.sol and gets balance ..... {from :account ???}
    }).then(function(value) {   //useless lines
        callback(value.valueOf());
    }).catch(function(e) {
        console.log(e);
        callback("Error 404");
    });
  },
    
    
    getLandByOwner: function(owner_id, callback) { //gets the selected account 
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    MetaCoin.setProvider(self.web3.currentProvider);

    var meta;
    MetaCoin.deployed().then(function(instance) {  /// Metacoin.deployed ????
      meta = instance;
      
        return meta.getLandByOwner.call(owner_id, {from: account});    ///meta.getbalance calls Metacoin.sol and gets balance ..... {from :account ???}
    }).then(function(value) {   //useless lines
        callback(value.valueOf());
    }).catch(function(e) {
        console.log(e);
        callback("Error 404");
    });
  }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    /*
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
    */
  }