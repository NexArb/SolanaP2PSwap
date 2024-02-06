// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

interface IBridge {
    function addUserContract(address userIdentifier,address userContractAddress) external;
    function sendMessage(address userIdentifier,string calldata message) external payable;
    function callBridge(address userIdentifier,string calldata message) external;
    function getUserContractAddress(address userIdentifier) view external returns(address);
}