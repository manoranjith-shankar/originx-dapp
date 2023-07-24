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
        string description;
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
        uint raffleId;
        string raffleName;
        string description;
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
        uint winningTicket;
        address raffleWinner;
        bool raffleCancelled;
        bool raffleEnded;
    }

    mapping(uint256 => Raffle) private raffles;
    mapping(uint256 => mapping(uint256 => address)) public ticketToOwner;
    uint256 private raffleCount = 0;

    event WinnerSelected(
        uint256 indexed raffleId,
        uint256 winningTicketNumber,
        address winningTicketOwner
    );
    event raffleEnded(uint256 indexed raffleId);

    function createRaffle(
        string memory _raffleName,
        string memory _description,
        uint256 _nftPrice,
        uint256 _totalVolumeofTickets,
        uint256 _endTime,
        uint256 _nftId,
        address _nftContractAddress,
        string memory _nftSourceLink,
        address _charityAddress
    ) public returns (uint256) {
        require(
            _nftContractAddress != address(0),
            "Invalid NFT contract address"
        );
        require(_endTime > block.timestamp, "End time must be in future");
        IERC721 nftContract = IERC721(_nftContractAddress);
        require(
            msg.sender == nftContract.ownerOf(_nftId),
            "Only NFT owner can create raffle"
        );

        nftContract.safeTransferFrom(msg.sender, address(this), _nftId);
        raffleCount++;

        raffles[raffleCount] = Raffle({
            raffleId: raffleCount,
            raffleName: _raffleName,
            description: _description,
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
            developmentTeam: payable(
                address(0xE46Cb9CA18520D3F0394F570C35259c188B33B98)
            )
        });

        raffles[raffleCount].ticketPrice = raffles[raffleCount].rafflePool.div(
            _totalVolumeofTickets
        );

        return raffleCount;
    }

    function getTicketPrice(uint256 _raffleId) public view returns (uint256) {
        return raffles[_raffleId].ticketPrice;
    }

    function getTicketsOwned(
        address _address,
        uint256 raffleId
    ) public view returns (uint256) {
        uint256 totalTicketsOwned = 0;
        for (uint256 i = 0; i < raffles[raffleId].tickets.length; i++) {
            if (
                ticketToOwner[raffleId][raffles[raffleId].tickets[i]] ==
                _address
            ) {
                totalTicketsOwned = totalTicketsOwned.add(1);
            }
        }
        return totalTicketsOwned;
    }

    function getOwnedRaffles(
        address owner
    ) public view returns (uint256 totalRaffles, uint256[] memory raffleIds) {
        uint256[] memory ownedRaffleIds = new uint256[](raffleCount);
        uint256 count = 0;
        for (uint256 i = 0; i <= raffleCount; i++) {
            if (raffles[i].raffleCreator == owner) {
                ownedRaffleIds[count] = i;
                count++;
            }
        }
        uint256[] memory result = new uint256[](count);
        for (uint256 j = 0; j < count; j++) {
            result[j] = ownedRaffleIds[j];
        }
        return (count, result);
    }

    function getAvailableTickets(
        uint256 _raffleID
    ) public view returns (uint256) {
        Raffle storage raffle = raffles[_raffleID];
        require(raffle.raffleId != 0, "Raffle not found");

        if (raffle.raffleEnded || raffle.raffleCancelled) {
            return 0;
        } else {
            return raffle.totalVolumeofTickets - raffle.totalSoldTickets;
        }
    }

    function buyTicket(
        uint256 _raffleId,
        uint256 _totalTicketsWanted
    ) public payable {
        Raffle storage raffle = raffles[_raffleId];

        require(!raffle.raffleCancelled, "Raffle is cancelled");
        require(!raffle.raffleEnded, "Raffle is ended");
        require(_totalTicketsWanted > 0, "Invalid number of tickets");
        require(
            _totalTicketsWanted <=
                raffle.totalVolumeofTickets - raffle.totalSoldTickets,
            "Not enough tickets available"
        );
        uint256 totalTicketPrice = _totalTicketsWanted * raffle.ticketPrice;
        require(msg.value >= totalTicketPrice, "Incorrect payment amount");

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

    function getTotalTicketPrice(
        uint _raffleId,
        uint256 _totalTicketsWanted
    ) public view returns (uint256) {
        Raffle storage raffle = raffles[_raffleId];

        uint256 totalTicketPrice = _totalTicketsWanted * raffle.ticketPrice;
        return totalTicketPrice;
    }

    // This function picks a random ticket from totalSoldTickets for a raffleId.
    function pickRandomTicket(uint256 raffleId) private view returns (uint256) {
        uint256 randomNumber = uint256(
            keccak256(abi.encodePacked(block.timestamp, block.difficulty))
        ) % raffles[raffleId].totalSoldTickets;
        return randomNumber;
    }

    function pickWinner(uint256 raffleId) public {
        Raffle storage raffle = raffles[raffleId];

        require(!raffle.raffleCancelled, "Raffle has been cancelled");
        require(!raffle.raffleEnded, "Raffle has already ended");
        require(
            raffle.totalSoldTickets >= (raffle.totalVolumeofTickets * 80) / 100,
            "Raffle can't be completed yet"
        );

        // Pick a random ticket as the winning ticket.
        uint256 winningTicketNumber = pickRandomTicket(raffleId);
        address winningTicketOwner = ticketToOwner[raffleId][
            winningTicketNumber
        ];
        require(
            winningTicketOwner != address(0),
            "Winner has not been selected yet"
        );

        // Store the winning ticket information in the raffle struct
        raffle.raffleWinner = winningTicketOwner;

        // Emit an event to indicate that a winner has been selected.
        emit WinnerSelected(raffleId, winningTicketNumber, winningTicketOwner);

        // Send the prize pool to each entity
        uint256 rafflePrizePool = raffles[raffleId].rafflePool;
        uint256 raffleCreatorPrize = raffles[raffleId].nftPrice +
            (rafflePrizePool.mul(5)).div(100);
        uint256 developmentTeamPrize = (rafflePrizePool.mul(5)).div(100);
        uint256 charityPrize = rafflePrizePool -
            raffleCreatorPrize -
            developmentTeamPrize;

        // Transfer the prize amounts to each entity.
        payable(raffle.raffleCreator).transfer(raffleCreatorPrize);
        payable(raffle.developmentTeam).transfer(developmentTeamPrize);
        payable(raffle.charityAddress).transfer(charityPrize);

        // Call safeTransferFrom function on ERC721 token contract to transfer the NFT to the winner.
        IERC721(raffle.nftContractAddress).safeTransferFrom(
            address(this),
            winningTicketOwner,
            raffle.nftId
        );

        // Mark the raffle as ended
        raffle.raffleEnded = true;

        // Emit raffleEnded event
        emit raffleEnded(raffleId);
    }

    function cancelRaffle(uint256 _raffleId) public {
        Raffle storage raffle = raffles[_raffleId];
        require(
            msg.sender == raffle.raffleCreator,
            "Only raffle creator can cancel the lottery"
        );
        require(!raffle.raffleEnded, "Raffle has already ended");

        // Refund funds to ticket owners
        for (uint256 i = 0; i < raffle.tickets.length; i++) {
            uint256 ticket = raffle.tickets[i];
            address ticketOwner = ticketToOwner[_raffleId][ticket];
            if (ticketOwner != address(0)) {
                payable(ticketOwner).transfer(raffle.ticketPrice);
            }
        }

        // Transfer NFT back to raffle creator
        IERC721(raffle.nftContractAddress).safeTransferFrom(
            address(this),
            raffle.raffleCreator,
            raffle.nftId
        );

        // Update raffle status
        raffle.raffleCancelled = true;
        raffle.raffleEnded = true;
    }

    function getPrizePool(
        uint256 _raffleId
    ) public view returns (uint256, uint256, uint256, uint256) {
        uint256 rafflePrizePool = raffles[_raffleId].rafflePool;
        uint256 raffleCreatorPrize = raffles[_raffleId].nftPrice +
            (rafflePrizePool.mul(5)).div(100);
        uint256 developmentTeamPrize = (rafflePrizePool.mul(5)).div(100);
        uint256 charityPrize = rafflePrizePool -
            raffleCreatorPrize -
            developmentTeamPrize;

        return (
            rafflePrizePool,
            raffleCreatorPrize,
            developmentTeamPrize,
            charityPrize
        );
    }

    function getRaffleWinner(
        uint256 raffleId
    ) public view returns (address winner, uint256 winningTicket) {
        require(
            !raffles[raffleId].raffleCancelled,
            "Raffle has been cancelled"
        );
        require(!raffles[raffleId].raffleEnded, "Raffle has already ended");
        require(
            raffles[raffleId].winningTicket != 0,
            "Winner has not been picked yet"
        );

        return (
            raffles[raffleId].raffleWinner,
            raffles[raffleId].winningTicket
        );
    }

    function raffleInfo(
        uint256 _raffleID
    ) public view returns (RaffleInfo memory) {
        Raffle storage raffle = raffles[_raffleID];

        RaffleInfo memory raffleInfo = RaffleInfo({
            raffleId: _raffleID,
            raffleName: raffle.raffleName,
            description: raffle.description,
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
            winningTicket: raffle.winningTicket,
            raffleWinner: raffle.raffleWinner,
            raffleCancelled: raffle.raffleCancelled,
            raffleEnded: raffle.raffleEnded
        });

        return raffleInfo;
    }

    function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) external returns (bytes4) {
        return this.onERC721Received.selector;
    }

    function getEntityAddresses(
        uint256 _raffleId
    ) public view returns (address, address, address) {
        return (
            raffles[_raffleId].raffleCreator,
            raffles[_raffleId].developmentTeam,
            raffles[_raffleId].charityAddress
        );
    }

    function getTotalRaffles() public view returns (uint256) {
        return raffleCount;
    }

    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }
}