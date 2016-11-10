module.exports = function(deployer) {
  deployer.autolink();
  deployer.deploy( ContractSplitEther
		 , '0x55928c1d15ae0c55ad452ec870f035bc1012cf51'
		 , '0xd621031b5ad34a5ecfddecbf821e0fbb32a31731');
};
