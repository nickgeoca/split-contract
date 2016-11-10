pragma solidity ^0.4.2;

contract ContractSplitEther {
  // Addresses to split ether over
  struct Addresses {
    address _1;
    address _2;
  }
  Addresses private addresses;

  function ContractSplitEther(address address1, address address2) {
    addresses._1 = address1;
    addresses._2 = address2;
  }

  function () {
    sendTo(addresses._1, this.balance / 2);
    sendTo(addresses._2, this.balance);
  }

  function sendTo(address addr, uint bal) private {
    if (!addr.send(bal)) {throw;}
  }

  function getAddresses() returns (address[2]) {
    return [addresses._1, addresses._2];
  }
}

/*

 */
