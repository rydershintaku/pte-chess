// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFTContract is ERC721 {
    uint256 public nextTokenId;
    uint256 public mintPrice = 0.001 ether;

    constructor() ERC721("P2EChess", "NFT") {}

    function mint() public payable {
        require(msg.value >= mintPrice, "Insufficient ETH sent");
        _safeMint(msg.sender, nextTokenId);
        nextTokenId++;
    }
}