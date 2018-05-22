pragma solidity ^0.4.23;

import "./openzeppelin/Destructible.sol";

contract StakeEtherMotivation is Destructible {

    event IncentiveCreated(
        address indexed _from,
        address indexed _to,
        bytes32 _goal,
        uint _deadline,
        uint _staked);

    event IncentiveFulfilledandRefunded(
        address indexed _from,
        address indexed _to,
        bytes32 _goal,
        uint _deadline,
        uint _staked);

    event IncentiveCancelledandRefunded(
        address indexed _from,
        address indexed _to,
        bytes32 _goal,
        uint _deadline,
        uint _staked);

    event IncentiveExpiredAndPayed(
        address indexed _from,
        address indexed _to,
        bytes32 _goal,
        uint _deadline,
        uint _staked);

    struct Incentive {
        bytes32 _incentiveId;
        address _creator;
        address _recipient;
        bytes32 _goal;
        uint _deadline; // Seconds since January 1, 1970 00:00
        uint _staked;
    }

    // Map each address to list of keccak256 hashes (of corresponding incentive metadata)
    mapping (address => bytes32[]) incentiveIdsByAddress;

    // Map keccak256 hash to Incentive struct
    mapping (bytes32 => Incentive) incentiveById;

    function createIncentive(address recipient, bytes32 goal, uint deadline) public payable {
        require(deadline > now);
        bytes32 incentiveId = keccak256(msg.sender, recipient, goal, deadline, now);
        incentiveIdsByAddress[msg.sender].push(incentiveId);
        incentiveById[incentiveId] = Incentive(incentiveId, msg.sender, recipient, goal, deadline, msg.value);
        emit IncentiveCreated(msg.sender, recipient, goal, deadline, msg.value);
    }

    function fetchIncentives() view public returns (bytes32[], address[], address[], bytes32[], uint[], uint[]) {

        bytes32[] memory incentiveIds = new bytes32[](incentiveIdsByAddress[msg.sender].length);
        address[] memory creators = new address[](incentiveIdsByAddress[msg.sender].length);
        address[] memory recipients = new address[](incentiveIdsByAddress[msg.sender].length);
        bytes32[] memory goals = new bytes32[](incentiveIdsByAddress[msg.sender].length);
        uint[] memory deadlines = new uint[](incentiveIdsByAddress[msg.sender].length);
        uint[] memory stakes = new uint[](incentiveIdsByAddress[msg.sender].length);

        for (uint i = 0; i < incentiveIdsByAddress[msg.sender].length; i++) {
            incentiveIds[i] = incentiveById[incentiveIdsByAddress[msg.sender][i]]._incentiveId;
            creators[i] = incentiveById[incentiveIdsByAddress[msg.sender][i]]._creator;
            recipients[i] = incentiveById[incentiveIdsByAddress[msg.sender][i]]._recipient;
            goals[i] = incentiveById[incentiveIdsByAddress[msg.sender][i]]._goal;
            deadlines[i] = incentiveById[incentiveIdsByAddress[msg.sender][i]]._deadline;
            stakes[i] = incentiveById[incentiveIdsByAddress[msg.sender][i]]._staked;
        }

        return (incentiveIds, creators, recipients, goals, deadlines, stakes);
    }

    function fulfillIncentive(bytes32 incentiveId) public {
        require(incentiveById[incentiveId]._creator == msg.sender);

        if (incentiveById[incentiveId]._deadline < now) {
            // Incentive is expired, transfer payment to recipient, emit IncentiveExpiredAndPayed event, and delete incentive
            emit IncentiveExpiredAndPayed(msg.sender,
                incentiveById[incentiveId]._recipient,
                incentiveById[incentiveId]._goal,
                incentiveById[incentiveId]._deadline,
                incentiveById[incentiveId]._staked);
            incentiveById[incentiveId]._recipient.transfer(incentiveById[incentiveId]._staked);
            delete incentiveById[incentiveId];
        } else {
            // Refund staked ether, emit IncentiveFulfilledandRefunded event, and delete incentive
            emit IncentiveFulfilledandRefunded(msg.sender,
                incentiveById[incentiveId]._recipient,
                incentiveById[incentiveId]._goal,
                incentiveById[incentiveId]._deadline,
                incentiveById[incentiveId]._staked);
            msg.sender.transfer(incentiveById[incentiveId]._staked);
            delete incentiveById[incentiveId];
        }
    }

    function cancelIncentive(bytes32 incentiveId) public {
        require(incentiveById[incentiveId]._creator == msg.sender);

        if (incentiveById[incentiveId]._deadline < now) {
            // Incentive is expired, transfer payment to recipient, emit IncentiveExpiredAndPayed event, and delete incentive
            emit IncentiveExpiredAndPayed(msg.sender,
                incentiveById[incentiveId]._recipient,
                incentiveById[incentiveId]._goal,
                incentiveById[incentiveId]._deadline,
                incentiveById[incentiveId]._staked);
            incentiveById[incentiveId]._recipient.transfer(incentiveById[incentiveId]._staked);
            delete incentiveById[incentiveId];
        } else {
            // Refund staked ether, emit IncentiveCancelledandRefunded event, and delete incentive
            emit IncentiveCancelledandRefunded(msg.sender,
                incentiveById[incentiveId]._recipient,
                incentiveById[incentiveId]._goal,
                incentiveById[incentiveId]._deadline,
                incentiveById[incentiveId]._staked);
            msg.sender.transfer(incentiveById[incentiveId]._staked);
            delete incentiveById[incentiveId];
        }
    }

}