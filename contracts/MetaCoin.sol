pragma solidity ^0.4.2;

import "ConvertLib.sol";

contract ContractSplitEther {
  // Addresses to split ether over
  struct SplitAddresses {
    address address1;
    address address2;
  }
  SplitAddresses public splitAddresses;

  function ContractSplitEther(address address1, address address2) {
    sharedAddresses.address1 = address1;
    sharedAddresses.address2 = address2;

  }

  function sendCoin(uint amount) returns(bool sufficient) {
    uint amount1 = amount / 2;
    uint amount2 = amount1 + (amount % 2);

    splitAddresses.address1.send(amount1 ether)
    splitAddresses.address2.send(amount2 ether)
    
    return true;
  }

}


  /*
  // event Transfer(address indexed _from, address indexed _to, uint256 _value);
  // tx.origin
  halfEther = etherRecieved / 2;
  send(halfEther, sharedAddresses.address1);
  sendRestOf(sharedAddresses.address2)
  tx.origin.send()
  */
