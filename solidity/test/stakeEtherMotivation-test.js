const StakeEtherMotivation = artifacts.require("StakeEtherMotivation");

contract('StakeEtherMotivation test', async (accounts) => {

  it('should have a balance of 0', async () => {
    let instance = await StakeEtherMotivation.deployed();
    let balance = await instance.getBalance.call(accounts[0]);
    assert.equal(balance.valueOf(), 0);
  });

  it('should return the staked ether after a cancellation', async () => {
    let instance = await StakeEtherMotivation.deployed();



  });

  it('should send the staked ether after the deadline', async () => {
    let instance = await StakeEtherMotivation.deployed();


  });

});