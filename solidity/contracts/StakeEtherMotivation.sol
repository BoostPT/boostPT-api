pragma solidity ^0.4.23;

import "./openzeppelin/Destructible.sol";
import "./openzeppelin/SafeMath.sol";

contract StakeEtherMotivation is Destructible {

    using SafeMath for uint256;

    event IncentiveCreated(
        address indexed _from,
        address indexed _to,
        uint _deadline,
        uint _staked);

    event IncentiveFulfilledandRefunded(
        address indexed _from,
        address indexed _to,
        uint _deadline,
        uint _staked);

    event IncentiveCancelledandRefunded(
        address indexed _from,
        address indexed _to,
        uint _deadline,
        uint _staked);

    event IncentiveExpiredAndPayed(
        address indexed _from,
        address indexed _to,
        uint _deadline,
        uint _staked);

    struct Incentive {
        bytes32 _incentiveId;
        address _creator;
        address _recipient;
        uint _deadline; // Seconds since January 1, 1970 00:00
        uint _staked;
    }

    // Map each user to list of incentives
    mapping (address => Incentive[]) incentives;

    // Map each user to number of incentives
    mapping (address => uint) incentiveCount;

    function createIncentive(address recipient, uint deadline) public payable returns (bytes32) {
        require(deadline > now);
        bytes32 incentiveId = keccak256(msg.sender, recipient, deadline, now);
        Incentive memory newIncentive = Incentive(incentiveId, msg.sender, recipient, deadline, msg.value);
        incentives[msg.sender].push(newIncentive);
        incentiveCount[msg.sender] = incentiveCount[msg.sender].add(1);
        emit IncentiveCreated(msg.sender, recipient, deadline, msg.value);
        return incentiveId;
    }

    function _removeIncentiveHelper(Incentive[] storage userIncentives, uint index) internal {
        if (index >= userIncentives.length) return;
        for (uint i = index; i < userIncentives.length - 1; i++){
            userIncentives[i] = userIncentives[i + 1];
        }
        delete userIncentives[userIncentives.length-1];
        incentiveCount[msg.sender] = incentiveCount[msg.sender].sub(1);
        userIncentives.length--;
    }

    function fetchIncentives() view public returns (bytes32[], address[], address[], uint[], uint[]) {

        bytes32[] memory incentiveIds = new bytes32[](incentiveCount[msg.sender]);
        address[] memory creators = new address[](incentiveCount[msg.sender]);
        address[] memory recipients = new address[](incentiveCount[msg.sender]);
        uint[] memory deadlines = new uint[](incentiveCount[msg.sender]);
        uint[] memory stakes = new uint[](incentiveCount[msg.sender]);

        for (uint i = 0; i < incentiveCount[msg.sender]; i++) {
            incentiveIds[i] = incentives[msg.sender][i]._incentiveId;
            creators[i] = incentives[msg.sender][i]._creator;
            recipients[i] = incentives[msg.sender][i]._recipient;
            deadlines[i] = incentives[msg.sender][i]._deadline;
            stakes[i] = incentives[msg.sender][i]._staked;
        }

        return (incentiveIds, creators, recipients, deadlines, stakes);
    }

    function fulfillIncentive(bytes32 incentiveId) public {
        for (uint i = 0; i < incentives[msg.sender].length; i++) {
            require(incentives[msg.sender][i]._creator == msg.sender);

            // If incentive is expired, transfer payment to recipient, emit event, and delete incentive
            if (incentives[msg.sender][i]._deadline < now) {
                emit IncentiveExpiredAndPayed(msg.sender,
                    incentives[msg.sender][i]._recipient,
                    incentives[msg.sender][i]._deadline,
                    incentives[msg.sender][i]._staked);
                incentives[msg.sender][i]._recipient.transfer(incentives[msg.sender][i]._staked);
                _removeIncentiveHelper(incentives[msg.sender], i);
            }

            // Refund staked ether
            if (incentives[msg.sender][i]._incentiveId == incentiveId && incentives[msg.sender][i]._deadline > now) {
                emit IncentiveFulfilledandRefunded(msg.sender,
                incentives[msg.sender][i]._recipient,
                incentives[msg.sender][i]._deadline,
                incentives[msg.sender][i]._staked);
                msg.sender.transfer(incentives[msg.sender][i]._staked);
                _removeIncentiveHelper(incentives[msg.sender], i);
                break;
            }
        }
    }

    function cancelIncentive(bytes32 incentiveId) public {
        for (uint i = 0; i < incentives[msg.sender].length; i++) {
            require(incentives[msg.sender][i]._creator == msg.sender);

            // If incentive is expired, transfer payment to recipient, emit event, and delete incentive
            if (incentives[msg.sender][i]._deadline < now) {
                emit IncentiveExpiredAndPayed(msg.sender,
                    incentives[msg.sender][i]._recipient,
                    incentives[msg.sender][i]._deadline,
                    incentives[msg.sender][i]._staked);
                incentives[msg.sender][i]._recipient.transfer(incentives[msg.sender][i]._staked);
                _removeIncentiveHelper(incentives[msg.sender], i);
            }

            // Refund staked ether
            if (incentives[msg.sender][i]._incentiveId == incentiveId && incentives[msg.sender][i]._deadline > now) {
                emit IncentiveCancelledandRefunded(msg.sender,
                    incentives[msg.sender][i]._recipient,
                    incentives[msg.sender][i]._deadline,
                    incentives[msg.sender][i]._staked);
                msg.sender.transfer(incentives[msg.sender][i]._staked);
                _removeIncentiveHelper(incentives[msg.sender], i);
                break;
            }
        }
    }

}