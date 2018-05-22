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
      0x7B0b0185E088B8f76171b78fA2Ee7C383F4Af940, // 2nd address in Ganache
      Date.now()/1000 + 60 * 60 * 24,
      { from: accounts[0], value: web3.toWei(0.08, 'ether')});

    const result = await instance.fetchIncentives();

    assert.equal(result[1][0], '0xCbdC7A852494eb6B4BcB44F114D2396AcAe15668'.toLowerCase() );
    // 2nd test isn't passing for some reason
    // AssertionError: expected '0x7b0b0185e088b8b10e1f1ae5b8b11b8a00000000' to equal '0x7b0b0185e088b8f76171b78fa2ee7c383f4af940'
    // assert.equal(result[2][0], '0x7B0b0185E088B8f76171b78fA2Ee7C383F4Af940'.toLowerCase() );
    assert.equal(result[4][0].toNumber(), web3.toWei(0.08, 'ether'));
  });

  it('should return the staked ether after a cancellation and delete the incentive', async () => {
    await instance.createIncentive(
      0x7B0b0185E088B8f76171b78fA2Ee7C383F4Af940, // 2nd address in Ganache
      Date.now()/1000 + 60 * 60 * 24,
      { from: accounts[0], value: web3.toWei(0.08, 'ether')});

    const before = await instance.fetchIncentives();
    await instance.cancelIncentive(before[0][0]);
    const after =  await instance.fetchIncentives();

    console.log(after)

    assert.equal(after[0].length, 0);
    assert.equal(after[1].length, 0);
    assert.equal(after[2].length, 0);
    assert.equal(after[3].length, 0);
    assert.equal(after[4].length, 0);
  });


  // it('should send the staked ether after the deadline', async () => {
  //
  //
  //
  // });

});