// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "github.com/abdk-consulting/abdk-libraries-solidity/ABDKMath64x64.sol";

contract mainNftRaffle is IERC721Receiver {
    using SafeMath for uint256;
    using ABDKMath64x64 for int128;

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

    mapping(uint256 => Raffle) private raffles;
    mapping(uint256 => mapping(uint256 => address)) public ticketToOwner;
    uint256 private raffleCount = 0;

    event WinnerSelected(uint256 indexed raffleId, uint256 winningTicketNumber, address winningTicketOwner);

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

    function getTicketPrice(uint256 _raffleId) public view returns (uint256) {
        return raffles[_raffleId].ticketPrice;
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

        require(!raffle.raffleCancelled, "Raffle is cancelled");
        require(!raffle.raffleEnded, "Raffle is ended");
        require(_totalTicketsWanted > 0, "Invalid number of tickets");
        require(_totalTicketsWanted <= raffle.totalVolumeofTickets - raffle.totalSoldTickets, "Not enough tickets available");
        require(msg.value >= _totalTicketsWanted * raffle.ticketPrice, "Incorrect payment amount");

        // Update ticket ownership
        for (uint256 i = 0; i < _totalTicketsWanted; i++) {
            uint256 ticket = raffle.totalSoldTickets + 1 + i;
            raffle.tickets.push(ticket);
            ticketToOwner[_raffleId][ticket] = msg.sender;
        }

    // Update raffle info
    raffle.totalSoldTickets += _totalTicketsWanted;
    raffle.fundsInContract += msg.value;
    }

    // This function picks a random ticket from totalSoldTickets for a raffleId.
    function pickRandomTicket(uint256 raffleId) private view returns (uint256) {
        uint256 randomNumber = uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty))) % raffles[raffleId].totalSoldTickets;
        return randomNumber;
    }

    function pickWinner(uint256 raffleId) public {
    require(raffles[raffleId].totalSoldTickets >= raffles[raffleId].totalVolumeofTickets * 80 / 100, "Raffle can't be completed yet");

    // Pick a random ticket as the winning ticket.
    uint256 winningTicketNumber = pickRandomTicket(raffleId);
    address winningTicketOwner = ticketToOwner[raffleId][winningTicketNumber];
    raffles[raffleId].raffleWinner = winningTicketOwner;

    // Emit an event to indicate that a winner has been selected.
    emit WinnerSelected(raffleId, winningTicketNumber, winningTicketOwner);
    }

    // This function calculates the prize amount for each entity.
    // function calculatePrizePool(uint256 _raffleId) private returns (uint256, uint256, uint256, uint256) {
    //     uint256 rafflePrizePool = raffles[_raffleId].rafflePool;
    //     uint256 raffleCreatorPrize = raffles[_raffleId].nftPrice + (rafflePrizePool * 5) / 100;
    //     uint256 developmentTeamPrize = (rafflePrizePool * 5) / 100;
    //     uint256 charityPrize = rafflePrizePool - raffleCreatorPrize - developmentTeamPrize;
    //     return (rafflePrizePool, raffleCreatorPrize, developmentTeamPrize, charityPrize);
    // }

    // // This function sends the prize pool to each entity.
    // function sendPrizePool(uint256 _raffleId) public {
    //     require(address(this).balance >= raffles[_raffleId].rafflePool, "Insufficient contract balance");

    //     // Retrieve the winner information from the raffle struct
    //     address winningTicketOwner = raffles[_raffleId].raffleWinner;
    //     uint256 winningTicketNumber = pickRandomTicket(_raffleId);

    //     require(winningTicketOwner != address(0), "Winner has not been selected yet");

    //     // Calculate the prize pool for each entity.
    //     (uint256 rafflePrizePool, uint256 raffleCreatorPrize , uint256 developmentTeamPrize, uint256 charityPrize) = calculatePrizePool(_raffleId);

    //     // Transfer the prize amounts to each entity.
    //     payable(raffles[_raffleId].raffleCreator).transfer(raffleCreatorPrize);

    //     // Call safeTransferFrom function on ERC721 token contract to transfer the NFT to the winner.
    //     IERC721(raffles[_raffleId].nftContractAddress).safeTransferFrom(address(this), winningTicketOwner, raffles[_raffleId].nftId);

    //     payable(raffles[_raffleId].developmentTeam).transfer(developmentTeamPrize);
    //     payable(raffles[_raffleId].charityAddress).transfer(charityPrize);
    // }

    function calculatePrizePool(uint256 _raffleId) private returns (uint256, uint256, uint256, uint256) {
        uint256 rafflePrizePool = raffles[_raffleId].rafflePool;

        int128 rafflePrizePoolFixed = ABDKMath64x64.fromUInt(rafflePrizePool);
        int128 raffleCreatorPrizeFixed = ABDKMath64x64.add(
            ABDKMath64x64.fromUInt(raffles[_raffleId].nftPrice),
            ABDKMath64x64.div(ABDKMath64x64.mul(rafflePrizePoolFixed, ABDKMath64x64.fromUInt(5)), ABDKMath64x64.fromUInt(100))
        );

        int128 developmentTeamPrizeFixed = ABDKMath64x64.div(ABDKMath64x64.mul(rafflePrizePoolFixed, ABDKMath64x64.fromUInt(5)), ABDKMath64x64.fromUInt(100));

        int128 charityPrizeFixed = ABDKMath64x64.sub(
            ABDKMath64x64.sub(rafflePrizePoolFixed, raffleCreatorPrizeFixed),
            developmentTeamPrizeFixed
        );

        uint256 raffleCreatorPrize = ABDKMath64x64.toUInt(raffleCreatorPrizeFixed);
        uint256 developmentTeamPrize = ABDKMath64x64.toUInt(developmentTeamPrizeFixed);
        uint256 charityPrize = ABDKMath64x64.toUInt(charityPrizeFixed);

        return (rafflePrizePool, raffleCreatorPrize, developmentTeamPrize, charityPrize);
    }

    function getCalculatedPrize(uint256 _raffleId) public view returns (uint256, uint256, uint256, uint256) {
        uint256 rafflePrizePool = raffles[_raffleId].rafflePool;

        int128 rafflePrizePoolFixed = ABDKMath64x64.fromUInt(rafflePrizePool);
        int128 raffleCreatorPrizeFixed = ABDKMath64x64.add(
            ABDKMath64x64.fromUInt(raffles[_raffleId].nftPrice),
            ABDKMath64x64.div(ABDKMath64x64.mul(rafflePrizePoolFixed, ABDKMath64x64.fromUInt(5)), ABDKMath64x64.fromUInt(100))
        );

        int128 developmentTeamPrizeFixed = ABDKMath64x64.div(ABDKMath64x64.mul(rafflePrizePoolFixed, ABDKMath64x64.fromUInt(5)), ABDKMath64x64.fromUInt(100));

        int128 charityPrizeFixed = ABDKMath64x64.sub(
            ABDKMath64x64.sub(rafflePrizePoolFixed, raffleCreatorPrizeFixed),
            developmentTeamPrizeFixed
        );

        uint256 raffleCreatorPrize = ABDKMath64x64.toUInt(raffleCreatorPrizeFixed);
        uint256 developmentTeamPrize = ABDKMath64x64.toUInt(developmentTeamPrizeFixed);
        uint256 charityPrize = ABDKMath64x64.toUInt(charityPrizeFixed);

        return (rafflePrizePool, raffleCreatorPrize, developmentTeamPrize, charityPrize);
    }

 function sendPrizePool(uint256 _raffleId) public {
    require(address(this).balance >= raffles[_raffleId].rafflePool, "Insufficient contract balance");

    // Retrieve the winner information from the raffle struct
    address winningTicketOwner = raffles[_raffleId].raffleWinner;
    uint256 winningTicketNumber = pickRandomTicket(_raffleId);

    require(winningTicketOwner != address(0), "Winner has not been selected yet");

    // Calculate the prize pool for each entity using ABDKMath64x64 library.
    (uint256 rafflePrizePool, uint256 raffleCreatorPrize , uint256 developmentTeamPrize, uint256 charityPrize) = calculatePrizePool(_raffleId);

    // Transfer the prize amounts to each entity.
    payable(raffles[_raffleId].raffleCreator).transfer(raffleCreatorPrize);

    // Call safeTransferFrom function on ERC721 token contract to transfer the NFT to the winner.
    IERC721(raffles[_raffleId].nftContractAddress).safeTransferFrom(address(this), winningTicketOwner, raffles[_raffleId].nftId);

    payable(raffles[_raffleId].developmentTeam).transfer(developmentTeamPrize);
    payable(raffles[_raffleId].charityAddress).transfer(charityPrize);

    // Send the remaining balance to the winner
    uint256 remainingBalance = rafflePrizePool - raffleCreatorPrize - developmentTeamPrize - charityPrize;
    payable(winningTicketOwner).transfer(remainingBalance);
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

    function getContractBalance() public view returns (uint256) {
    return address(this).balance;
    }
    }