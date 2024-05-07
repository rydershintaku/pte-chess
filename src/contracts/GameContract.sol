// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./ProfileContract.sol";

enum GameStatus { Waiting, Active, Finished }
enum GameOutcome { Draw, PlayerOneWins, PlayerTwoWins }

struct Game {
    address playerOne;
    address playerTwo;
    uint256 stake;
    string gameCode;
    GameStatus status;
    GameOutcome outcome;
}

contract GameContract {
    mapping(string => Game) public games;
    address public profileContractAddress;

    constructor(address _profileContractAddress) {
        profileContractAddress = _profileContractAddress;
    }

    event GameStarted(string gameCode, address playerOne, address playerTwo, uint256 stake);
    event GameEnded(string gameCode, GameOutcome outcome);

    function startGame(address _playerTwo, string memory _gameCode, uint256 _stake) public {
        require(ProfileContract(profileContractAddress).checkBalance(msg.sender) >= _stake, "Insufficient balance");
        require(ProfileContract(profileContractAddress).checkBalance(_playerTwo) >= _stake, "Opponent has insufficient balance");

        games[_gameCode] = Game({
            playerOne: msg.sender,
            playerTwo: _playerTwo,
            stake: _stake,
            gameCode: _gameCode,
            status: GameStatus.Active,
            outcome: GameOutcome.Draw
        });

        ProfileContract(profileContractAddress).updateBalance(msg.sender, -int256(_stake));
        ProfileContract(profileContractAddress).updateBalance(_playerTwo, -int256(_stake));

        emit GameStarted(_gameCode, msg.sender, _playerTwo, _stake);
    }

    function endGame(string memory _gameCode, GameOutcome _outcome) public {
        Game storage game = games[_gameCode];
        require(game.status == GameStatus.Active, "Game is not active");

        game.outcome = _outcome;
        game.status = GameStatus.Finished;

        int256 cryptoChangePlayerOne;
        int256 cryptoChangePlayerTwo;

        if (_outcome == GameOutcome.PlayerOneWins) {
            cryptoChangePlayerOne = int256(game.stake * 2);
            cryptoChangePlayerTwo = -int256(game.stake);
            ProfileContract(profileContractAddress).recordWin(game.playerOne);
            ProfileContract(profileContractAddress).recordLoss(game.playerTwo);
            ProfileContract(profileContractAddress).updateBalance(game.playerOne, cryptoChangePlayerOne);
        } else if (_outcome == GameOutcome.PlayerTwoWins) {
            cryptoChangePlayerOne = -int256(game.stake);
            cryptoChangePlayerTwo = int256(game.stake * 2);
            ProfileContract(profileContractAddress).recordWin(game.playerTwo);
            ProfileContract(profileContractAddress).recordLoss(game.playerOne);
            ProfileContract(profileContractAddress).updateBalance(game.playerTwo, cryptoChangePlayerTwo);
        } else {
            cryptoChangePlayerOne = int256(game.stake);
            cryptoChangePlayerTwo = int256(game.stake);
            ProfileContract(profileContractAddress).recordDraw(game.playerTwo);
            ProfileContract(profileContractAddress).recordDraw(game.playerOne);
            ProfileContract(profileContractAddress).updateBalance(game.playerOne, cryptoChangePlayerOne);
            ProfileContract(profileContractAddress).updateBalance(game.playerTwo, cryptoChangePlayerTwo);
        }

        ProfileContract(profileContractAddress).updateMatches(game.playerOne, Matchs(_outcome, cryptoChangePlayerOne, game.playerTwo));
        ProfileContract(profileContractAddress).updateMatches(game.playerTwo, Matchs(_outcome, cryptoChangePlayerTwo, game.playerOne));

        emit GameEnded(_gameCode, _outcome);
    }
}