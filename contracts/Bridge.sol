// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

import "./interface/BridgeReceiver.sol";
import "./interface/IBridge.sol";
import "./Manager.sol";
import "./interface/IUserSub.sol";

contract Bridge is IBridge{

    mapping(address=>address) users;
    address _owner;
    address public managerAddress;

    event BridgeCall(address contractAddress, string message);

    constructor(){
        _owner = msg.sender;
        managerAddress = address(new Manager());
    }

    modifier onlyAdmin{
        require(msg.sender == _owner);
        _;
    }

    function addUserContract(address userIdentifier,address userContractAddress) external onlyAdmin{
        users[userIdentifier] = userContractAddress;
    }

    function sendMessage(address userIdentifier,string calldata message) external payable {
        require(users[userIdentifier] != address(0),"User is not registered");
        require(users[userIdentifier] == msg.sender,"This is not the user contract");
        bytes memory payload = abi.encodeWithSignature("sendMessage(string)",message);
        (bool success,) = users[userIdentifier].call(payload);
        require(success);
    }

    //TODO this function must called by only off-chain
    function callBridge(address userIdentifier,string calldata message) external {
        IManager manager = IManager(managerAddress);
        manager.sendMessage(userIdentifier);
        emit BridgeCall(msg.sender,message);
    }

    function getUserContractAddress(address userIdentifier) view external onlyAdmin returns(address) {
        return users[userIdentifier];
    }

    function setMessagePrice(uint256 messagePrice) external onlyAdmin {
        IManager manager = IManager(managerAddress);
        manager.setMessagePrice(messagePrice);
    }

}