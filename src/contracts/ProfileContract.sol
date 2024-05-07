// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./GameContract.sol";

interface INFTContract {
    function ownerOf(uint256 tokenId) external view returns (address);
    function mint() external payable;
}

struct Matchs {
    GameOutcome outcome;
    int256 cryptoChange;
    address opponent;
}

struct Stats {
    uint256 wins;
    uint256 losses;
    uint256 draws;
}

contract ProfileContract {
    INFTContract public nftContract;
    mapping(address => uint256) public balances;
    mapping(address => Matchs[]) public playerMatches;
    mapping(address => Stats) public playerStats;
    address public gameContractAddress;

    constructor(address _nftContract, address _gameContractAddress) {
        nftContract = INFTContract(_nftContract);
        gameContractAddress = _gameContractAddress;
    }

    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw(uint256 amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
    }

    function canPlay(uint256 tokenId) public view returns (bool) {
        return nftContract.ownerOf(tokenId) == msg.sender;
    }

    function buyNFT() public payable {
        nftContract.mint{value: msg.value}();
    }

    function updateMatches(address player, Matchs memory newMatch) public {
        require(msg.sender == gameContractAddress, "Unauthorized");
        playerMatches[player].push(newMatch);
    }

    function checkBalance(address player) public view returns (uint256) {
        return balances[player];
    }

    function updateBalance(address player, int256 amount) public {
        require(msg.sender == gameContractAddress, "Unauthorized");
        if (amount < 0) {
            require(balances[player] >= uint256(-amount), "Insufficient balance");
            balances[player] -= uint256(-amount);
        } else {
            balances[player] += uint256(amount);
        }
    }

    function recordWin(address player) public {
        require(msg.sender == gameContractAddress, "Unauthorized");
        playerStats[player].wins += 1;
    }

    function recordLoss(address player) public {
        require(msg.sender == gameContractAddress, "Unauthorized");
        playerStats[player].losses += 1;
    }

    function recordDraw(address player) public {
        require(msg.sender == gameContractAddress, "Unauthorized");
        playerStats[player].draws += 1;
    }
}