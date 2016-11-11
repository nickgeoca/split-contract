var accounts;
var account;

function setStatus(message) {
  var status = document.getElementById("status");
  status.innerHTML = message;
};

function refreshBalance() {
  var contract = ContractSplitEther.deployed();

  contract.getRecipients.call(account, {from: account}).then(function(value) {
    var addr1 = value.valueOf()[0];
    var addr2 = value.valueOf()[1];
    var recipient1_element = document.getElementById("balance-r1");
    var recipient2_element = document.getElementById("balance-r2");
    var eth1 = web3.fromWei(web3.eth.getBalance(addr1), "ether").toString(10);
    var eth2 = web3.fromWei(web3.eth.getBalance(addr2), "ether").toString(10);
    recipient1_element.innerHTML = addr1.substring(0,8) + ' .. eth ' + eth1;
    recipient2_element.innerHTML = addr2.substring(0,8) + ' .. eth ' + eth2;
  }).catch(function(e) {
    console.error(e);
    setStatus("Error getting balance: " + e);
  });
};

function sendCoin() {
  var contract = ContractSplitEther.deployed();

  var amount = parseInt(document.getElementById("amount").value);
  var sender = document.getElementById("sender").value;

  setStatus("Initiating transaction... (please wait)");

  web3.eth.sendTransaction({from:sender, to:contract.address, value: web3.toWei(amount, "ether")}, function(error, result) {    
    if (error) {
      console.error(error)
      setStatus("Transaction failed: " + error);
      return;
    }
    console.log('Transaction ID: ' + result);
    refreshBalance();
    setStatus("Transaction success!");
  });
};

window.onload = function() {
  web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
      alert("There was an error fetching your accounts.");
      return;
    }

    if (accs.length == 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }

    accounts = accs;
    account = accounts[0];

    refreshBalance();
  });
}
