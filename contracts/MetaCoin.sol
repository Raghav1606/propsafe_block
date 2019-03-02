pragma solidity ^0.4.17;
pragma experimental ABIEncoderV2;

import "./ConvertLib.sol";

// This is just a simple example of a coin-like contract.
// It is not standards compatible and cannot be expected to talk to other
// coin/token contracts. If you want to create a standards-compliant
// token, see: https://github.com/ConsenSys/Tokens. Cheers!


//metacoin has access control

contract MetaCoin {
   
   
   
   
   
   
   //----------------------------------------ACCESS CONTROL  ---------------------------------------------------
   
       address owner;
    mapping(address => bool) validators;
    mapping(address => bool) transactors;
    RequestAccessTransaction[] requestAccessTransactions;

    struct RequestAccessTransaction {
        uint index;
        uint roleRequested;        
        address requesterAddress;
    }

    enum Roles {
        VALIDATOR,
        TRANSACTOR
    }
    
    constructor() public {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        //require(msg.sender == owner, "Sender address is not owner");
        _;
    }

    modifier onlyValidator() {
        require(validators[msg.sender] == true || msg.sender == owner, "Sender address is not registered as validator");
        _;
    }
    
    modifier onlyTransactor() {
        require(
            transactors[msg.sender] == true || validators[msg.sender] == true || owner == msg.sender, "Sender address is not registered as transactor");
        _;
    }

    function requestAccess(uint _role) public  {
        RequestAccessTransaction memory txn = RequestAccessTransaction({ 
            index: requestAccessTransactions.length,
            roleRequested: _role,
            requesterAddress: msg.sender
        }); 
        
        //structure ka object txn
        
        requestAccessTransactions.push(txn);
        //pushed in the list
    }

    function approveRequest(uint _index) public onlyValidator {
        RequestAccessTransaction storage txn = requestAccessTransactions[_index];
        if (txn.roleRequested == uint(Roles.VALIDATOR)) {
            setValidator(txn.requesterAddress);
            delete requestAccessTransactions[_index];
            requestAccessTransactions.length--;
        } else if (txn.roleRequested == uint(Roles.TRANSACTOR)) {
            setTransactor(txn.requesterAddress);
            delete requestAccessTransactions[_index];
            requestAccessTransactions.length--;
        } else {
            revert("Role applied does not exist");
        }
    }

    function getRequest(uint _index) public view returns (
        uint,
        address,
        uint
    ) {
        RequestAccessTransaction memory txn = requestAccessTransactions[_index];
        return (txn.index, txn.requesterAddress, txn.roleRequested);
    }

    function getRequestsLength() public view returns (uint) {
        return requestAccessTransactions.length;
    }

    function setOwner(address _newOwner) public onlyOwner {
        owner = _newOwner;
    }

    function setValidator(address _validatorAddress) public onlyOwner returns(bool sufficient){
        validators[_validatorAddress] = true;
        
        return true;
    }
    
    function setTransactor(address _transactorAddress) public onlyOwner onlyValidator {
        transactors[_transactorAddress] = true;
    }

    function isValidator(address _adr) public view returns (bool) {
        return validators[_adr];
    }

    function isTransactor(address _adr) public view returns (bool) {
        return transactors[_adr];
    }

    function isCeo(address _adr) public view returns (bool) {
        return owner == _adr;
    }

   
   //------------------------------------------------------------------------------
    
    
    
    


///.................................................................,.,.,.,.,.,.....................................
//Land registry


 

    struct Land {
        uint property_id;
        address owner_id;
        string ownerName;
        uint locality_id;
        address[] previousOwners;
        string current_status;
        string _address;
        uint area;
        uint[] registration_number;
    }
    
    
    
    struct AddLandTransaction {
        uint index;
        address createdBy;
        address[] validators;
        Land land;
        string status;
    }
    
    


    struct TransferLandTransaction {
        uint registration_number;
        string date;
        uint landIndex;
        address newLandOwner;
        string newLandOwnerName;
        uint property_id;
        uint deed_id;
        uint subDeed_id;
        uint SRO_office_id;
        uint locality_id;
        uint book_number;
        string mode_of_payment;
        address landOwnerSeller;
        string status;
        address createdBy;
        address[] validators;
        uint property_Price;
        string property_for;
    }
    
    mapping(address => uint[]) addressToLandIndexes;
    Land[] lands;
    AddLandTransaction[] addLandTransactions;
    TransferLandTransaction[] transferLandTransactions;
    uint requiredValidatorsLength = 1;
    
    
    
    
    
    ///////
    function addLandTransaction(address owner_id, string memory ownerName, uint locality_id, string current_status, string _address, uint area) public onlyTransactor
    {
        Land memory land = Land({ 
            property_id: 0,
            owner_id: owner_id,
            ownerName: ownerName,
            locality_id: locality_id,
            previousOwners: new address[](0),
            current_status:current_status,
            _address:_address,
            area:area,
            registration_number: new uint[](0)
        }); 
        
        AddLandTransaction memory txn = AddLandTransaction({  
            index: addLandTransactions.length,
            createdBy: msg.sender,
            validators: new address[](0),
            land: land,
            status: "Pending"
        });
        
        addLandTransactions.push(txn);
    }

    ///////
    function transferLandTransaction(string _date, uint landIndex, address newLandOwner,string newLandOwnerName, uint ids, 
    string mode_of_payment, uint property_Price, string property_for) public onlyTransactor
    {
        
        TransferLandTransaction memory txn;
        Land x = lands[landIndex];
        
        /*txn.registration_number = transferLandTransactions.length;
        txn. property_id = ids%1000;
        ids = ids/1000;
        txn.deed_id = ids%1000;
        ids = ids/1000;
        txn.subDeed_id = ids%1000;
        ids = ids/1000;
        txn.SRO_office_id = ids%1000;
        ids = ids/1000;
        txn.locality_id = ids%1000;
        ids = ids/1000;
        txn.book_number = ids%1000;
        txn.date = _date;
        txn.landIndex = landIndex;
        txn.newLandOwner = newLandOwner;
        txn.newLandOwnerName = newLandOwnerName;
        txn.mode_of_payment = mode_of_payment;
        txn.landOwnerSeller = x.owner_id;
        txn.status = "Pending";
        txn.property_Price =  property_Price;
        txn.property_for =  property_for;
        txn.createdBy =  msg.sender;
        txn.validators =  new address[](0);
        */
        
        transferLandTransactions.push(txn);
    }
    
    //////
    function validateAddLandTransaction(uint _index) public onlyValidator {
        AddLandTransaction storage txn = addLandTransactions[_index];
        for (uint i = 0; i < txn.validators.length; i++) {
            if (txn.validators[i] == msg.sender) {
                revert("This address is already a validator");
            }
        }
        
        txn.validators.push(msg.sender);

        if (txn.validators.length == requiredValidatorsLength) {
            addLand(txn);
        }
    }   

    ///////////////////////
    function validateTransferLandTransaction(uint _index) public onlyValidator {
        TransferLandTransaction storage txn = transferLandTransactions[_index];
        for (uint i = 0; i < txn.validators.length; i++) {
            if (txn.validators[i] == msg.sender) {
                revert("This address is already a validator");
            }
        }

        txn.validators.push(msg.sender);

        if (txn.validators.length == requiredValidatorsLength) {
            transferLand(txn);
        }
    }

//////////////
   function getAddLandTransaction(uint _index) public view onlyValidator returns (AddLandTransaction memory t) {
        
        AddLandTransaction memory txn = addLandTransactions[_index];
        return txn;
        
    }

//////////////
    function getTransferLandTransaction(uint _index) public view onlyValidator returns (TransferLandTransaction memory t) {
        TransferLandTransaction memory txn = transferLandTransactions[_index];
        return txn;
    }


//////////////////////
    function getAddLandTransactionsLength() public view returns (uint) {
        return addLandTransactions.length;
    }

    function getTransferLandTransactionsLength() public view returns (uint) {
        return transferLandTransactions.length;
    }

    function getLandsLength() public view returns (uint) {
        return lands.length;
    }



/////////////
    function getLandById(uint _index) public view onlyTransactor returns (Land memory l){ 
    
    //uint property_id,address owner_id, string ownerName, uint locality_id, address[] previousOwners, string current_status,string address,
    //uint area, uint[] registration_number) {
        
        Land memory land = lands[_index];
        
        return (land);
    }


//////////
    function getLandA() public view onlyTransactor returns ( Land[] memory l) {
        return (lands);
    }
    
////////////
    function getAddLandTransactionsA() public view onlyTransactor returns (AddLandTransaction[] memory l) {
        return (addLandTransactions);
    }
    
    function getTransferLandTransactionsA() public view onlyTransactor returns (TransferLandTransaction[] memory l) {
        return (transferLandTransactions);
    }
   
    ////
    function addLand(AddLandTransaction storage _transaction) internal onlyValidator {
        
        _transaction.land.property_id = lands.length;
        _transaction.status = "Validated";
        lands.push(_transaction.land);
        
        //delete addLandTransactions[_transaction.index];
        
        //addLandTransactions.length--;

    }
    
/////////////
    function transferLand(TransferLandTransaction storage _transaction) internal onlyValidator {
    
        lands[_transaction.landIndex].previousOwners.push(lands[_transaction.landIndex].owner_id);
        lands[_transaction.landIndex].owner_id = _transaction.newLandOwner;
        lands[_transaction.landIndex].ownerName = _transaction.newLandOwnerName;
        lands[_transaction.landIndex].registration_number.push(_transaction.registration_number);
        transferLandTransactions[_transaction.registration_number].status = "Validated";
    }


    function getLandByOwner(address owner_id) public view onlyTransactor returns ( Land[] l1) {
        
        Land[] l;
        for(uint i = 0;i < lands.length; i++){
            if(lands[i].owner_id == owner_id)
                l.push(lands[i]);
        }
        return (l);
    }
    
    
    
}






   
    //........................................................
    
    
    
    
    
    
    
    
    
    




    
    
    
    
    
    //...........................................................
