// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

contract mainNftRaffle is IERC721Receiver {
    using SafeMath for uint256;

    struct Raffle {
    uint raffleId;
    string raffleName;
    uint256 nftPrice;
    uint256 totalVolumeofTickets;
    uint256 endTime;
    uint256 nftId;
    address nftContractAddress;
    string nftSourceLink;
    address charityAddress;
    address raffleCreator;
    uint256 rafflePool;
    uint256 ticketPrice;
    uint256 totalSoldTickets;
    bool raffleCancelled;
    bool raffleEnded;
    uint256 fundsInContract;
    uint256[] tickets;
    }

    struct RaffleInfo {
        string raffleName;
        uint256 nftPrice;
        uint256 totalVolumeofTickets;
        uint256 endTime;
        uint256 nftId;
        address nftContractAddress;
        string nftSourceLink;
        address charityAddress;
        address raffleCreator;
        uint256 rafflePool;
        uint256 ticketPrice;
        uint256 totalSoldTickets;
        bool raffleCancelled;
        bool raffleEnded;
        }

    struct TicketOwnership {
       mapping(address => uint256) ticketsOwned;
    }

    mapping(uint256 => Raffle) private raffles;
    mapping(uint256 => TicketOwnership) private ticketOwnerships;
    uint256 private randomNonce = 0;
    uint256 private raffleCount = 0;

    function createRaffle(string memory _raffleName, uint256 _nftPrice, uint256 _totalVolumeofTickets, uint256 _endTime, uint256 _nftId, address _nftContractAddress, string memory _nftSourceLink, address _charityAddres) public returns (uint256) {
    require(_nftContractAddress != address(0), "Invalid NFT contract address");
    require(_endTime > block.timestamp, "End time must be in future");
    IERC721 nftContract = IERC721(_nftContractAddress);
    require(msg.sender == nftContract.ownerOf(_nftId), "Only NFT owner can create raffle");

    nftContract.safeTransferFrom(msg.sender, address(this), _nftId);
    raffleCount++;

    raffles[raffleCount] = Raffle({
    raffleId: raffleCount,
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
    charityAddress: _charityAddres,
    totalSoldTickets: 0,
    raffleCancelled: false,
    raffleEnded: false,
    fundsInContract: 0,
    tickets: new uint256[](0)
    });

    raffles[raffleCount].ticketPrice = raffles[raffleCount].rafflePool.div(_totalVolumeofTickets);

    return raffleCount;
    }

    function getAvailableTickets(uint256 _raffleID) public view returns (uint256) {
    Raffle storage raffle = raffles[_raffleID];
    require(raffle.raffleId != 0, "Raffle not found");

    if (raffle.raffleEnded || raffle.raffleCancelled) {
        return 0;
    } else {
        return raffle.totalVolumeofTickets - raffle.totalSoldTickets;
    }
    }

    function buyTicket(uint256 _raffleID, uint256 _totalTicketsWanted) public payable {
    Raffle storage raffle = raffles[_raffleID];
    require(raffle.raffleId != 0, "Raffle not found");
    require(!raffle.raffleCancelled, "Raffle cancelled");
    require(!raffle.raffleEnded, "Raffle ended");
    require(raffle.totalSoldTickets.add(_totalTicketsWanted) <= raffle.totalVolumeofTickets, "Not enough tickets available");

    // Calculate the price for the requested number of tickets
    uint256 ticketPrice = raffle.ticketPrice.mul(_totalTicketsWanted);
    require(msg.value >= ticketPrice, "Insufficient funds");

    // Add the tickets to the ticket array
    for (uint256 i = 0; i < _totalTicketsWanted; i++) {
        uint256 ticketNumber = raffle.tickets.length + 1;
        raffle.tickets.push(ticketNumber);
        ticketOwnerships[_raffleID].ticketsOwned[msg.sender] = ticketNumber;
    }

    // Increment the number of sold tickets
    raffle.totalSoldTickets = raffle.totalSoldTickets.add(_totalTicketsWanted);

    // Update the funds in the contract
    raffle.fundsInContract = raffle.fundsInContract.add(msg.value);
    }

    function raffleInfo(uint256 _raffleID) public view returns (RaffleInfo memory) {
    Raffle storage raffle = raffles[_raffleID];

    RaffleInfo memory raffleInfo = RaffleInfo({
        raffleName: raffle.raffleName,
        nftPrice: raffle.nftPrice,
        totalVolumeofTickets: raffle.totalVolumeofTickets,
        endTime: raffle.endTime,
        nftId: raffle.nftId,
        nftContractAddress: raffle.nftContractAddress,
        nftSourceLink: raffle.nftSourceLink,
        charityAddress: raffle.charityAddress,
        raffleCreator: raffle.raffleCreator,
        rafflePool: raffle.rafflePool,
        ticketPrice: raffle.ticketPrice,
        totalSoldTickets: raffle.totalSoldTickets,
        raffleCancelled: raffle.raffleCancelled,
        raffleEnded: raffle.raffleEnded
    });

    return raffleInfo;
    }

    function onERC721Received(address operator, address from, uint256 tokenId, bytes calldata data) external returns (bytes4) {
    return this.onERC721Received.selector;
    }
    }