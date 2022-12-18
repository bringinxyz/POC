// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Bringin {
    IERC20 public token;

    event PulledFunds(address from, uint amount);

    constructor(address _tokenAddress) {
        token = IERC20(_tokenAddress);
    }

    function pullFunds(address _from, uint _amount) public {
        token.transferFrom(_from, address(this), _amount);
        emit PulledFunds(_from, _amount);
    }

    function approveUser(address _spender, uint _amount) public {
        token.approve(_spender, _amount);
    }

    function increaseUserAllowance(address _spender, uint addedValue) public {
        address cur = msg.sender;
        this.approveUser(_spender, token.allowance(cur, _spender) + addedValue);
    }

    function getTokenBalance() public view returns (uint) {
        return token.balanceOf(address(this));
    }
}
