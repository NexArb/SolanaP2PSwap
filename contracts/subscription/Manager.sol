// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;
import "@openzeppelin/contracts/access/Ownable.sol";
import "./UserSub.sol";
import "./interface/IUserSub.sol";
import "./interface/IManager.sol";

contract Manager is Ownable, IManager{

    mapping(address => address) userSubs;
    uint256 oneMessagePrice; // GWEI

    constructor()
        Ownable(msg.sender)
    {}

    modifier userCanHaveOnlyOneSub {
        require(userSubs[msg.sender] == address(0),"You have already an account");
        _;
    }

    function startUserSub() external userCanHaveOnlyOneSub{
        address userSub = address(new UserSub(address(this)));
        userSubs[msg.sender] = userSub;
    }

    function sendMessage(address userIdentifier) external onlyOwner {
        IUserSub userSub = IUserSub(userSubs[userIdentifier]);
        userSub.sendMessage();
    }

    function setMessagePrice(uint256 _oneMessagePrice) external onlyOwner {
        oneMessagePrice = _oneMessagePrice;
    } 

    function getMessagePrice() view external returns(uint256) {
        return oneMessagePrice;
    }

    function getUserSubContractAddress(address userAddress) view external onlyOwner returns(address){
        return userSubs[userAddress];
    }

    function getMyUserSubAddress() view external returns(address) {
        return userSubs[msg.sender];
    }

}