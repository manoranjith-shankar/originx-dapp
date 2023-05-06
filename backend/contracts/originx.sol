// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

contract nftRafflerOriginx is IERC721Receiver {
    using SafeMath for uint256;

    struct Raffle {
    string raffleName;
    uint256 nftPrice;
    uint256 totalVolumeofTickets;
    uint256 endTime;
    uint256 nftId;
    address nftContractAddress;
    string nftSourceLink;
    address raffleCreator;
    uint256 rafflePool;
    uint256 ticketPrice;
    uint256 totalSoldTickets;
    bool raffleCancelled;
    bool raffleEnded;
    uint256[] tickets;
    }

    struct TicketOwnership {
       mapping(address => uint256) ticketsOwned;
    }

    mapping(uint256 => Raffle) private raffles;
    mapping(uint256 => TicketOwnership) private ticketOwnerships;
    uint256 private randomNonce = 0;
    mapping(uint256 => uint256[4]) private raffleIDToRandomNumber;
    uint256 private raffleCount = 0;

    // function generateRaffleID() private returns (uint256[4] memory) {
    //     randomNonce++;
    //     uint256[4] memory raffleID;
    //     raffleID[0] = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, randomNonce)));
    //     return raffleID;
    // }

    function generateRaffleID() public view returns (uint256[4] memory) {
    uint256[4] memory raffleID; 
    raffleID[0] = uint256(keccak256(abi.encodePacked(
        block.timestamp, 
        block.difficulty, 
        msg.sender, 
        block.coinbase
    )));
    return raffleID;
    }

    function createRaffle(string memory _raffleName, uint256 _nftPrice, uint256 _totalVolumeofTickets, uint256 _endTime, uint256 _nftId, address _nftContractAddress, string memory _nftSourceLink) public returns (uint256[4] memory) {
    require(_nftContractAddress != address(0), "Invalid NFT contract address");
    require(_endTime > block.timestamp, "End time must be in future");
    IERC721 nftContract = IERC721(_nftContractAddress);
    require(msg.sender == nftContract.ownerOf(_nftId), "Only NFT owner can create raffle");

    nftContract.safeTransferFrom(msg.sender, address(this), _nftId);

    raffleCount++;
    uint256[4] memory raffleID = generateRaffleID();

    uint256 raffleIndex = raffleID[0];

    raffles[raffleIndex] = Raffle({
        raffleName: _raffleName,
        nftPrice: _nftPrice,
        totalVolumeofTickets: _totalVolumeofTickets,
        endTime: _endTime,
        nftId: _nftId,
        nftContractAddress: _nftContractAddress,
        nftSourceLink: _nftSourceLink,
        raffleCreator: msg.sender,
        rafflePool: (_nftPrice.mul(150)).div(100),
        ticketPrice: 0,
        totalSoldTickets: 0,
        raffleCancelled: false,
        raffleEnded: false,
        tickets: new uint256[](0)
    });

    raffles[raffleIndex].ticketPrice = raffles[raffleIndex].rafflePool.div(_totalVolumeofTickets);

    raffleIDToRandomNumber[raffleIndex] = raffleID;

    return raffleID;
    }

    function setTicketPrice(uint256 _raffleID) public {
        Raffle storage raffle = raffles[_raffleID];
        require(raffle.raffleCreator == msg.sender, "Only raffle creator can set ticket price");
        require(raffle.ticketPrice == 0, "Ticket price already set");

        raffle.ticketPrice = raffle.rafflePool.div(raffle.totalVolumeofTickets);
    }

    function cancelRaffle(uint256 _raffleID) public {
        Raffle storage raffle = raffles[_raffleID];
        require(raffle.raffleCreator == msg.sender, "Only raffle creator can cancel raffle");
        require(raffle.raffleCancelled == false, "Raffle already cancelled");

        raffle.raffleCancelled = true;

        IERC721 nftContract = IERC721(raffle.nftContractAddress);
        nftContract.safeTransferFrom(address(this), msg.sender, raffle.nftId);
    }
    
    function onERC721Received(address operator, address from, uint256 tokenId, bytes calldata data) external returns (bytes4) {
    return this.onERC721Received.selector;
    }
    }