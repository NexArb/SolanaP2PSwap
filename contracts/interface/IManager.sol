// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

interface IManager {
    function startUserSub() external;
    function setMessagePrice(uint256 _oneMessagePrice) external;
    function getMessagePrice() view external returns(uint256);
    function sendMessage(address userIdentifier) external;
    function getUserSubContractAddress(address userAddress) view external returns(address);
    function getMyUserSubAddress() view external returns(address);
}