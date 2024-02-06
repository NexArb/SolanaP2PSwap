// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;
import "@openzeppelin/contracts/access/Ownable.sol";
import "./interface/IManager.sol";
import "./interface/IUserSub.sol";


contract UserSub is Ownable,IUserSub {

    address creater;
    uint256 messageCount;

    constructor(address userAddress)
        Ownable(userAddress)
    {
        creater = msg.sender;
    }
    
    event Message(uint256 value,uint256 messagePrice,uint256 messageCount);

    modifier onlyCreaterOrAdmin {
        require(msg.sender == creater || msg.sender == owner(),"You are not creater");
        _;
    }

    function getMessageCount() view external returns(uint256) {
        return messageCount;
    }

    function sendMessage() external onlyOwner {
        messageCount -= 1;
    }
    function buyMessageByCreater(uint256 amount) external onlyOwner {
        messageCount += amount;
    }
    function buyMessage() external payable  {
        IManager manager = IManager(creater);
        uint256 messagePrice = manager.getMessagePrice();
        messageCount += msg.value / messagePrice;
    }

}