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

    // Map each address to list of incentives
    mapping (address => bytes32[]) incentiveIdsByAddress;

    // Map keccak256 hash to Incentive struct
    mapping (bytes32 => Incentive) incentiveById;

    // Map each user to number of incentives
    mapping (address => uint) incentiveCount;

    function createIncentive(address recipient, uint deadline) public payable {
        require(deadline > now);
        bytes32 incentiveId = keccak256(msg.sender, recipient, deadline, now);
        Incentive memory newIncentive = Incentive(incentiveId, msg.sender, recipient, deadline, msg.value);
        incentiveIdsByAddress[msg.sender].push(incentiveId);
        incentiveById[incentiveId] = newIncentive;
        incentiveCount[msg.sender] = incentiveCount[msg.sender].add(1);
        emit IncentiveCreated(msg.sender, recipient, deadline, msg.value);
    }

    function _deleteFromIdArrayHelper(uint index) internal {
        for (uint i = index; i < incentiveIdsByAddress[msg.sender].length; i++) {
            incentiveIdsByAddress[msg.sender][i] = incentiveIdsByAddress[msg.sender][i + 1];
        }
        incentiveIdsByAddress[msg.sender].length--;
    }


    function _removeIncentiveHelper(bytes32 incentiveId) internal {
        delete incentiveById[incentiveId];
        incentiveCount[msg.sender] = incentiveCount[msg.sender].sub(1);
        for (uint i = 0; i < incentiveIdsByAddress[msg.sender].length; i++) {
            if (incentiveIdsByAddress[msg.sender][i] == incentiveId) {
                _deleteFromIdArrayHelper(i);
                break;
            }
        }
    }

    function fetchIncentives() view public returns (bytes32[], address[], address[], uint[], uint[]) {

        bytes32[] memory incentiveIds = new bytes32[](incentiveCount[msg.sender]);
        address[] memory creators = new address[](incentiveCount[msg.sender]);
        address[] memory recipients = new address[](incentiveCount[msg.sender]);
        uint[] memory deadlines = new uint[](incentiveCount[msg.sender]);
        uint[] memory stakes = new uint[](incentiveCount[msg.sender]);

        for (uint i = 0; i < incentiveCount[msg.sender]; i++) {
            incentiveIds[i] = incentiveById[incentiveIdsByAddress[msg.sender][i]]._incentiveId;
            creators[i] = incentiveById[incentiveIdsByAddress[msg.sender][i]]._creator;
            recipients[i] = incentiveById[incentiveIdsByAddress[msg.sender][i]]._recipient;
            deadlines[i] = incentiveById[incentiveIdsByAddress[msg.sender][i]]._deadline;
            stakes[i] = incentiveById[incentiveIdsByAddress[msg.sender][i]]._staked;
        }

        return (incentiveIds, creators, recipients, deadlines, stakes);
    }

    function fulfillIncentive(bytes32 incentiveId) public {
        require(incentiveById[incentiveId]._creator == msg.sender);

        if (incentiveById[incentiveId]._deadline < now) {
            // Incentive is expired, transfer payment to recipient, emit IncentiveExpiredAndPayed event, and delete incentive
            emit IncentiveExpiredAndPayed(msg.sender,
                incentiveById[incentiveId]._recipient,
                incentiveById[incentiveId]._deadline,
                incentiveById[incentiveId]._staked);
            incentiveById[incentiveId]._recipient.transfer(incentiveById[incentiveId]._staked);
            _removeIncentiveHelper(incentiveId);
        } else {
            // Refund staked ether, emit IncentiveFulfilledandRefunded event, and delete incentive
            emit IncentiveFulfilledandRefunded(msg.sender,
                incentiveById[incentiveId]._recipient,
                incentiveById[incentiveId]._deadline,
                incentiveById[incentiveId]._staked);
            msg.sender.transfer(incentiveById[incentiveId]._staked);
            _removeIncentiveHelper(incentiveId);
        }
    }

    function cancelIncentive(bytes32 incentiveId) public {
        require(incentiveById[incentiveId]._creator == msg.sender);

        if (incentiveById[incentiveId]._deadline < now) {
            // Incentive is expired, transfer payment to recipient, emit IncentiveExpiredAndPayed event, and delete incentive
            emit IncentiveExpiredAndPayed(msg.sender,
                incentiveById[incentiveId]._recipient,
                incentiveById[incentiveId]._deadline,
                incentiveById[incentiveId]._staked);
            incentiveById[incentiveId]._recipient.transfer(incentiveById[incentiveId]._staked);
            _removeIncentiveHelper(incentiveId);
        } else {
            // Refund staked ether, emit IncentiveCancelledandRefunded event, and delete incentive
            emit IncentiveCancelledandRefunded(msg.sender,
                incentiveById[incentiveId]._recipient,
                incentiveById[incentiveId]._deadline,
                incentiveById[incentiveId]._staked);
            msg.sender.transfer(incentiveById[incentiveId]._staked);
            _removeIncentiveHelper(incentiveId);
        }
    }

}