// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract USDTbringin is ERC20 {
    event TokenBought(address _address, uint _tokens);

    constructor() ERC20("USDTbringin", "USDTb") {
        _mint(address(this), 100000 * 10 ** decimals());
    }

    function buyToken(uint tokens) public payable {
        require(
            tokens == amountToTokens(msg.value),
            "Amount is not equal to the token !!"
        );
        address buyer = msg.sender;
        _transfer(address(this), buyer, tokens);

        emit TokenBought(buyer, tokens);
    }

    function amountToTokens(uint amount) private view returns (uint) {
        return (amount / (10 ** decimals()));
    }

    function getBalanceEth() public view returns (uint) {
        return address(this).balance;
    }
}
