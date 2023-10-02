# WhiteList Contract:

This contract resembles :
```shell
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

contract WhiteList{

    // keeps track of total addresses whitelisted
    uint public numOfWhitelistedAddresses;

    // Max whitelistings allowed
    uint public maxWhitelistings;

    // mapping to knw a address whitelisted or not
    mapping (address => bool ) public whitelistedAddress;

    constructor (uint _maxWhitelistings){
        maxWhitelistings = _maxWhitelistings;
    }

    function addAddressToWhitelist() public {
        // Check if max limit reached
        require(numOfWhitelistedAddresses < maxWhitelistings, "Whitelisting Limit already reached");

        // Check if the signer is already in the whitelist 
        require(!whitelistedAddress[msg.sender], "Signer already whitelisted");

        // map the address to whitelisted 
        whitelistedAddress[msg.sender] = true;

        // as this address is whitelisted increase the count
        numOfWhitelistedAddresses+=1;
    }



}

```

The contract deployed at [Etherscan Block View](https://sepolia.etherscan.io/address/0xCAf93300dad837513aD8049f3927C1f36a84fbd2#code) 0xCAf93300dad837513aD8049f3927C1f36a84fbd2




# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```
