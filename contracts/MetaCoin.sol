pragma solidity ^0.4.17;

import "./ConvertLib.sol";

// This is just a simple example of a coin-like contract.
// It is not standards compatible and cannot be expected to talk to other
// coin/token contracts. If you want to create a standards-compliant
// token, see: https://github.com/ConsenSys/Tokens. Cheers!


////Metacoin has acessControl

contract MetaCoin {
   
   
   
   
   
   
   //----------------------------------------
   
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
	}
    
}


