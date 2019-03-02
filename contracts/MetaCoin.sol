pragma solidity ^0.4.17;

import "./ConvertLib.sol";

// This is just a simple example of a coin-like contract.
// It is not standards compatible and cannot be expected to talk to other
// coin/token contracts. If you want to create a standards-compliant
// token, see: https://github.com/ConsenSys/Tokens. Cheers!


//metacoin has access control

contract MetaCoin {
   
   
   
   
   
   
   //----------------------------------------ACCESS CONTROL
   
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
    
    /*constructor() public {
        owner = msg.sender;
    }*/

    modifier onlyOwner() {
        require(msg.sender == owner, "Sender address is not owner");
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

   
   //------------------------------------------
    
    
    
    
    
    
    
    
    
    /*
 	mapping (address => uint) balances;

	event Transfer(address indexed _from, address indexed _to, uint256 _value);

	function MetaCoin() public {
		balances[tx.origin] = 10000;
        owner = msg.sender;
	}

	function sendCoin(address receiver, uint amount) public returns(bool sufficient) {
		if (balances[msg.sender] < amount) return false;
		balances[msg.sender] -= amount;
		balances[receiver] += amount;
		Transfer(msg.sender, receiver, amount);
		return true;
	}

	function getBalanceInEth(address addr) public view returns(uint){
		return ConvertLib.convert(getBalance(addr),2);
	}

	function getBalance(address addr) public view returns(uint) {
		return balances[addr];
	}*/



///.................................................................,.,.,.,.,.,.....................................
//Land registry


   /*
    
    struct Land {
        address ownerAddress;
        address[] previousOwners;
        bytes32[] coordinates;
        string ownerName;
        bytes32 location;
    }
    
    struct AddLandTransaction {
        uint index;
        address createdBy;
        address[] validators;
        Land land;
    }
    
    struct TransferLandTransaction {
        uint index;
        uint landIndex;
        string newLandOwnerName;
        address createdBy;
        address newLandOwner;
        address[] validators;
    }
    
    mapping(address => uint[]) addressToLandIndexes;
    Land[] lands;
    AddLandTransaction[] addLandTransactions;
    TransferLandTransaction[] transferLandTransactions;
    uint requiredValidatorsLength = 1;
    
    function addLandTransaction(address _ownerAddress, bytes32[] memory _coordinates, string memory _ownerName, bytes32 _location) 
    public 
    onlyTransactor
    {
        Land memory land = Land({ 
            ownerAddress: _ownerAddress,
            previousOwners: new address[](0),
            coordinates: _coordinates,
            ownerName: _ownerName,
            location: _location
        }); 
        
        AddLandTransaction memory txn = AddLandTransaction({  
            index: addLandTransactions.length,
            createdBy: msg.sender,
            validators: new address[](0),
            land: land
        });
        
        addLandTransactions.push(txn);
    }

    function transferLandTransaction(address _newLandOwner, string memory _newLandOwnerName, uint _landIndex) 
    public 
    onlyTransactor
    {
        address[] memory validators;
        TransferLandTransaction memory txn = TransferLandTransaction({
            index: transferLandTransactions.length,
            landIndex: _landIndex,
            createdBy: msg.sender,
            newLandOwner: _newLandOwner,
            newLandOwnerName: _newLandOwnerName,
            validators: validators
        });
        transferLandTransactions.push(txn);
    }

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

    function getAddLandTransaction(uint _index) public view onlyValidator returns (
        uint index,
        address createdBy, 
        address[] memory validators,
        address ownerAddress,
        address[] memory previousOwners,
        bytes32[] memory coordinates,
        string memory ownerName,
        bytes32 location
    ) {
        AddLandTransaction memory txn = addLandTransactions[_index];
        Land memory land = txn.land;
        return (
        txn.index, txn.createdBy, txn.validators, land.ownerAddress, 
        land.previousOwners, land.coordinates, land.ownerName, land.location
        );
    }

    function getTransferLandTransaction(uint _index) public view onlyValidator returns (
        uint index,
        uint landIndex,
        string memory newLandOwnerName,
        address createdBy,
        address newLandOwner,
        address[] memory validators
    ) {
        TransferLandTransaction memory txn = transferLandTransactions[_index];
        return (txn.index, txn.landIndex, txn.newLandOwnerName, txn.createdBy, txn.newLandOwner, txn.validators);
    }

    function getAddLandTransactionsLength() public view returns (uint) {
        return addLandTransactions.length;
    }

    function getTransferLandTransactionsLength() public view returns (uint) {
        return transferLandTransactions.length;
    }

    function getLandsLength() public view returns (uint) {
        return lands.length;
    }

    function getLand(uint _index) public view onlyTransactor returns (
        address ownerAddress,
        address[] memory previousOwners,
        bytes32[] memory coordinates,
        string memory ownerName,
        bytes32 location
    ) {
        Land memory land = lands[_index];
        return (land.ownerAddress, land.previousOwners, land.coordinates, (land.ownerName), land.location);
    }
    
    function getLandA() public view onlyTransactor returns (
        Land[] memory l) {
        return (lands);
    }
    
    function addLand(AddLandTransaction storage _transaction) internal onlyValidator {
        require(_transaction.validators.length >= requiredValidatorsLength, "Transfer land needs at least two validators");
        //AddLandTransaction storage lastTransaction = addLandTransactions[addLandTransactions.length - 1];
        //lastTransaction.index = _transaction.index;   
        //addLandTransactions[_transaction.index] = lastTransaction;
        //addLandTransactions.length--;
        lands.push(_transaction.land);
        delete addLandTransactions[addLandTransactions.length - 1]; 
        addLandTransactions.length--;
    }

    function transferLand(TransferLandTransaction storage _transaction) internal onlyValidator {
        require(_transaction.validators.length >= requiredValidatorsLength, "Transfer land needs at least two validators");
        TransferLandTransaction storage lastTransaction = transferLandTransactions[transferLandTransactions.length - 1]; 
        lastTransaction.index = _transaction.index;
        transferLandTransactions[_transaction.index] = lastTransaction;
        delete transferLandTransactions[transferLandTransactions.length - 1];
        transferLandTransactions.length--;
        lands[_transaction.landIndex].previousOwners.push(lands[_transaction.landIndex].ownerAddress);
        lands[_transaction.landIndex].ownerAddress = _transaction.newLandOwner;
        lands[_transaction.landIndex].ownerName = _transaction.newLandOwnerName;
    }*/





}






   
    //........................................................
    
    
    
    
    
    
    
    
    
    




    
    
    
    
    
    //...........................................................
