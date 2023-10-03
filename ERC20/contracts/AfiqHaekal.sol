// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract AfiqHaekal is ERC20 {
    constructor()ERC20("AfiqHaekal","AFK"){} 

    function mint() public {
        _mint(msg.sender,100*10**18);
    }

    function burn100tokens() public{
        _burn(msg.sender,100*10**18);
    }
   function transfer(address recipient, uint256 amount) public override returns (bool) {
        _transfer(_msgSender(), recipient, amount);
        return true;
        }
}