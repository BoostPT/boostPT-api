pragma solidity ^0.4.23;
pragma experimental ABIEncoderV2;

import "./openzeppelin/Destructible.sol";

contract StakeEtherMotivation is Destructible {

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

    mapping (address => Incentive[]) incentives;

    function createIncentive(address recipient, uint deadline) public payable returns (bytes32) {
        require(deadline > now);
        bytes32 incentiveId = keccak256(msg.sender, recipient, deadline, now);
        Incentive memory newIncentive = Incentive(incentiveId, msg.sender, recipient, deadline, msg.value);
        incentives[msg.sender].push(newIncentive);
        emit IncentiveCreated(msg.sender, recipient, deadline, msg.value);
        return incentiveId;
    }

    function _removeIncentiveHelper(Incentive[] storage userIncentives, uint index) internal {
        if (index >= userIncentives.length) return;
        for (uint i = index; i < userIncentives.length - 1; i++){
            userIncentives[i] = userIncentives[i + 1];
        }
        delete userIncentives[userIncentives.length-1];
        userIncentives.length--;
    }

    function _getCount(Incentive[] incentiveArray) pure internal returns (uint) {
        return incentiveArray.length;
    }

    function fetchIncentives() public returns (Incentive[]) {
        // Loop through existing incentives, if deadline is < now, transfer payment to recipient, emit event,
        // and delete expired incentives from the end of the array.
        Incentive[] memory userIncentives = incentives[msg.sender];
        for (uint i = _getCount(userIncentives) - 1; i >= 0 ; i--) {
            require(incentives[msg.sender][i]._creator == msg.sender);
            if (userIncentives[i]._deadline < now) {
                emit IncentiveExpiredAndPayed(msg.sender,
                    userIncentives[i]._recipient,
                    userIncentives[i]._deadline,
                    userIncentives[i]._staked);
                userIncentives[i]._recipient.transfer(userIncentives[i]._staked);
                _removeIncentiveHelper(incentives[msg.sender], i);
            }
        }

        return incentives[msg.sender];
    }

    // Duplicating logic for fulfilling/cancelling incentives to avoid error passing events as a function param

    function fulfillIncentive(bytes32 incentiveId) public {
        for (uint i = 0; i < incentives[msg.sender].length; i++) {
            require(incentives[msg.sender][i]._creator == msg.sender);
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


    // Original implementation consolidating fulfilling/cancelling logic into one helper


//    function _deleteUserIncentive(bytes32 _incentiveId, event _IncentiveFulfilledOrCancelled) internal {
//        for (uint i = 0; i < incentives[msg.sender].length; i++) {
//            require(incentives[msg.sender][i]._creator == msg.sender);
//            if (incentives[msg.sender][i]._incentiveId == _incentiveId && incentives[msg.sender][i]._deadline > now) {
//                emit _IncentiveFulfilledOrCancelled(msg.sender,
//                incentives[msg.sender][i]._recipient,
//                incentives[msg.sender][i]._deadline,
//                incentives[msg.sender][i]._staked);
//                msg.sender.transfer(incentives[msg.sender][i]._staked);
//                _removeIncentiveHelper(incentives[msg.sender], i);
//                break;
//            }
//        }
//    }
//
//    function fulfillIncentive(bytes32 incentiveId) public {
//        _deleteUserIncentive(incentiveId, IncentiveFulfilledandRefunded);
//    }
//
//    function cancelIncentive(bytes32 incentiveId) public {
//        _deleteUserIncentive(incentiveId, IncentiveCancelledandRefunded);
//    }

}