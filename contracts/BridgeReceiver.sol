// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

interface BridgeReciever {
    function sendMessage(string calldata _message) external;
}