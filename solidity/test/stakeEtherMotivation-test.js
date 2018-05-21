const StakeEtherMotivation = artifacts.require("StakeEtherMotivation");

contract('StakeEtherMotivation test', async (accounts) => {

  let instance;

  beforeEach('instantiate contract for each test', async () => {
    instance = await StakeEtherMotivation.deployed();
  });

  it('initializes with the right owner', async () => {
    const owner = await instance.owner();
    assert.equal(owner, 0xCbdC7A852494eb6B4BcB44F114D2396AcAe15668, 'owner should be the deployer');
  });

  it('creates an incentive and fetches it successfully', async () => {
    await instance.createIncentive(
      0x7B0b0185E088B8f76171b78fA2Ee7C383F4Af940,
      Date.now()/1000 + 60 * 60 * 24,
      { from: accounts[0], value: web3.toWei(0.08, 'ether')});

    const result = await instance.fetchIncentives();

    console.log(result)
  });

  // it('should return the staked ether after a cancellation', async () => {
  //
  //
  //
  //
  // });
  //
  // it('should send the staked ether after the deadline', async () => {
  //
  //
  //
  // });

});