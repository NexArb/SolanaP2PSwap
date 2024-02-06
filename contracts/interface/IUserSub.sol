// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

interface IUserSub {
    function getMessageCount() view external returns(uint256);
    function sendMessage() external;
    function buyMessageByCreater(uint256 amount) external;
    function buyMessage() external payable;
}