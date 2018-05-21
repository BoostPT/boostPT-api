var StakeEtherMotivation = artifacts.require("../contracts/StakeEtherMotivation.sol");

module.exports = function(deployer) {
  deployer.deploy(StakeEtherMotivation);
};