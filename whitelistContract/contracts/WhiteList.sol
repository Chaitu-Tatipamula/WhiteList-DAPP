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
