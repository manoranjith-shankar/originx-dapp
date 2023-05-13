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
    uint winningTicket;
    address raffleWinner;
    address payable developmentTeam;
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
    mapping(uint256 => address) ticketToOwner;
    }

    mapping(uint256 => Raffle) private raffles;
    mapping(uint256 => mapping(uint256 => address)) public ticketToOwner;
    mapping(uint256 => TicketOwnership) private ticketOwnerships;
    uint256 private raffleCount = 0;

    function createRaffle(string memory _raffleName, uint256 _nftPrice, uint256 _totalVolumeofTickets, uint256 _endTime, uint256 _nftId, address _nftContractAddress, string memory _nftSourceLink, address _charityAddress) public returns (uint256) {
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
    charityAddress: _charityAddress,
    totalSoldTickets: 0,
    raffleCancelled: false,
    raffleEnded: false,
    fundsInContract: 0,
    tickets: new uint256[](0),
    winningTicket: 0,
    raffleWinner: address(0),
    developmentTeam: payable(address(0xc09AA2837EF2f70a33b4d49C59DCD4e779eF92Eb))
    });

    raffles[raffleCount].ticketPrice = raffles[raffleCount].rafflePool.div(_totalVolumeofTickets);

    return raffleCount;
    }

    function getTicketPrice(uint256 raffleId) public view returns (uint256) {
        return raffles[raffleId].ticketPrice;
    }

    function getTicketsOwned(address _address, uint256 raffleId) public view returns(uint256) {
        uint256 totalTicketsOwned = 0;
        for (uint256 i = 0; i < raffles[raffleId].tickets.length; i++) {
            if (ticketToOwner[raffleId][raffles[raffleId].tickets[i]] == _address) {
                totalTicketsOwned = totalTicketsOwned.add(1);
            }
        }
        return totalTicketsOwned;
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

        function buyTicket(uint256 _raffleId, uint256 _totalTicketsWanted) public payable {
        Raffle storage raffle = raffles[_raffleId];
        require(raffle.raffleCancelled == false, "Raffle has been cancelled");
        require(raffle.raffleEnded == false, "Raffle has ended");
        require(block.timestamp < raffle.endTime, "Raffle has ended");

        raffle.rafflePool = (raffle.nftPrice.mul(150)).div(100);
        raffle.ticketPrice = raffle.rafflePool.div(raffle.totalVolumeofTickets);

        require(msg.value == raffle.ticketPrice.mul(_totalTicketsWanted), "Incorrect payment amount");

        for (uint256 i = 0; i < _totalTicketsWanted; i++) {
            require(raffle.totalSoldTickets + i + 1 <= raffle.totalVolumeofTickets, "Not enough tickets available");
            uint256 newTicketId = raffle.totalSoldTickets + i + 1;
            raffle.tickets.push(newTicketId);
            ticketToOwner[_raffleId][newTicketId] = msg.sender;
            raffle.totalSoldTickets++;
        }

        raffle.fundsInContract += msg.value;
    }


    // This function picks a random ticket from totalSoldTickets for a raffleId.
    function pickRandomTicket(uint256 raffleId) private view returns (uint256) {
        uint256 randomNumber = uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty))) % raffles[raffleId].totalSoldTickets;
        return randomNumber;
    }

    event WinnerSelected(uint256 indexed raffleId, uint256 winningTicketNumber, address winningTicketOwner);

    function pickWinner(uint256 raffleId) public {
        require(raffles[raffleId].totalSoldTickets >= raffles[raffleId].totalVolumeofTickets * 80 / 100, "Raffle can't be completed yet");

        // Pick a random ticket as the winning ticket.
        uint256 winningTicketNumber = pickRandomTicket(raffleId);
        address winningTicketOwner = ticketOwnerships[raffleId].ticketToOwner[winningTicketNumber];
        raffles[raffleId].raffleWinner = winningTicketOwner;

        // Emit an event to indicate that a winner has been selected.
        emit WinnerSelected(raffleId, winningTicketNumber, winningTicketOwner);
    }

    // This function calculates the prize amount for each entity.
    function calculatePrizePool(uint256 raffleId) private returns (uint256, uint256, uint256, uint256) {
        uint256 rafflePrizePool = raffles[raffleId].rafflePool;
        uint256 raffleCreatorPrize = raffles[raffleId].nftPrice + rafflePrizePool * 5 / 100;
        uint256 developmentTeamPrize = rafflePrizePool * 5 / 100;
        uint256 charityPrize = rafflePrizePool - raffleCreatorPrize - developmentTeamPrize;
        return (raffleCreatorPrize, 0, developmentTeamPrize, charityPrize);
    }

    // This function sends the prize pool to each entity.
    function sendPrizePool(uint256 raffleId) public {
    require(address(this).balance >= raffles[raffleId].rafflePool, "Insufficient contract balance");
    // Check if the winner has been selected.
    bool winnerSelected = false;
    uint256 winningTicketNumber;
    address winningTicketOwner;

    require(winnerSelected, "Winner has not been selected yet");

    // Calculate the prize pool for each entity.
    (uint256 raffleCreatorPrize, , uint256 developmentTeamPrize, uint256 charityPrize) = calculatePrizePool(raffleId);

    // Transfer the prize amounts to each entity.
    payable(raffles[raffleId].raffleCreator).transfer(raffleCreatorPrize);

    // Call safeTransferFrom function on ERC721 token contract to transfer the NFT to the winner.
    IERC721(raffles[raffleId].nftContractAddress).safeTransferFrom(address(this), raffles[raffleId].raffleWinner, raffles[raffleId].nftId);

    payable(raffles[raffleId].developmentTeam).transfer(developmentTeamPrize);
    payable(raffles[raffleId].charityAddress).transfer(charityPrize);
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