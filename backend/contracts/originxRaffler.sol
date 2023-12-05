// SPDX-License-Identifier: MIT
// sepolia - deployment
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";

contract originxRaffler is IERC721Receiver, VRFConsumerBaseV2, ConfirmedOwner {
    using SafeMath for uint256;

    mapping(uint256 => uint256) public raffleIdToRequestId;
    event RequestSent(uint256 requestId, uint32 numWords);
    event RequestFulfilled(uint256 requestId, uint256[] randomWords);

    struct RequestStatus {
        bool fulfilled; // whether the request has been successfully fulfilled
        bool exists; // whether a requestId exists
        uint256[] randomWords;
    }
    mapping(uint256 => RequestStatus)
        public s_requests; /* requestId --> requestStatus */
    VRFCoordinatorV2Interface COORDINATOR;

    event WinnerSelected(
        uint256 indexed raffleId,
        uint256 winningTicketNumber,
        address winningTicketOwner
    );

    // Your subscription ID.
    uint64 s_subscriptionId = 4646;

    // past requests Id.
    uint256[] public requestIds;
    uint256 public lastRequestId;

    bytes32 keyHash =
        0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c;

    uint32 callbackGasLimit = 100000;

    // The default is 3, but you can set this higher.
    uint16 requestConfirmations = 3;

    // For this example, retrieve 2 random values in one request.
    // Cannot exceed VRFCoordinatorV2.MAX_NUM_WORDS.
    uint32 numWords = 1;

    /**
     * COORDINATOR Sepolia: 0x8103B0A8A00be2DDC778e6e7eaa21791Cd364625
     */
    constructor()
        VRFConsumerBaseV2(0x8103B0A8A00be2DDC778e6e7eaa21791Cd364625)
        ConfirmedOwner(msg.sender)
    {
        COORDINATOR = VRFCoordinatorV2Interface(
            0x8103B0A8A00be2DDC778e6e7eaa21791Cd364625
        );
        s_subscriptionId;
    }

    struct Raffle {
        uint raffleId;
        string raffleName;
        string description;
        uint256 nftPrice;
        uint256 totalVolumeofTickets;
        uint256 endTime;
        string nftName;
        uint256 nftId;
        string[5] goals;
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
        string[5] goals;
        uint256 nftPrice;
        uint256 totalVolumeofTickets;
        uint256 endTime;
        string nftName;
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

    event raffleEnded(uint256 indexed raffleId);

    function requestRandomTicket(
        uint256 _raffleId
    ) public returns (uint256 requestId) {
        uint256 totalTicketsSold = raffles[_raffleId].totalSoldTickets;
        require(totalTicketsSold > 0, "No tickets sold yet");
        require(
            raffles[_raffleId].totalSoldTickets >=
                (raffles[_raffleId].totalVolumeofTickets * 80) / 100,
            "Not enough ticket sold"
        );

        requestId = COORDINATOR.requestRandomWords(
            keyHash,
            s_subscriptionId,
            requestConfirmations,
            callbackGasLimit,
            numWords
        );

        // Create a new RequestStatus for this requestId and associate it with the raffleId
        s_requests[requestId] = RequestStatus({
            randomWords: new uint256[](0),
            exists: true,
            fulfilled: false
        });

        // Map the raffleId to the requestId
        raffleIdToRequestId[_raffleId] = requestId;

        requestIds.push(requestId);
        lastRequestId = requestId;
        emit RequestSent(requestId, numWords);
        return requestId;
    }

    function getRequestForRaffle(
        uint256 _raffleId
    ) public view returns (uint256 requestId) {
        requestId = raffleIdToRequestId[_raffleId];
        require(requestId != 0, "No request for this id");
        return requestId;
    }

    function fulfillRandomWords(
        uint256 _requestId,
        uint256[] memory _randomWords
    ) internal override {
        require(s_requests[_requestId].exists, "request not found");
        s_requests[_requestId].fulfilled = true;
        s_requests[_requestId].randomWords = _randomWords;
        emit RequestFulfilled(_requestId, _randomWords);
    }

    function pickRandomTicket(
        uint256 _raffleId,
        uint256 requestId
    ) private view returns (uint256) {
        require(s_requests[requestId].fulfilled, "Request not fulfilled yet");
        uint256 randomValue = s_requests[requestId].randomWords[0];
        uint256 randomNumber = randomValue %
            raffles[_raffleId].totalSoldTickets;
        uint256 winningTicket = randomNumber + 1; // Adding 1 to convert 0-based index to 1-based ticket numbers
        return winningTicket;
    }

    function getRequestStatus(
        uint256 _requestId
    ) external view returns (bool fulfilled, uint256[] memory randomWords) {
        require(s_requests[_requestId].exists, "request not found");
        RequestStatus memory request = s_requests[_requestId];
        return (request.fulfilled, request.randomWords);
    }

    function createRaffle(
        string memory _raffleName,
        string memory _description,
        uint256 _nftPrice,
        uint256 _totalVolumeofTickets,
        uint256 _endTime,
        string memory _nftName,
        uint256 _nftId,
        address _nftContractAddress,
        string[5] memory _goals,
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
            goals: _goals,
            nftPrice: _nftPrice,
            totalVolumeofTickets: _totalVolumeofTickets,
            endTime: _endTime,
            nftName: _nftName,
            nftId: _nftId,
            nftContractAddress: _nftContractAddress,
            nftSourceLink: _nftSourceLink,
            raffleCreator: msg.sender,
            rafflePool: (_nftPrice * 150).div(100),
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
                address(0x1Eb43EBde750C57AaCEE85777e7c063218B0e1B4)
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

    function pickWinner(uint256 raffleId, uint256 requestId) public {
        Raffle storage raffle = raffles[raffleId];

        require(!raffle.raffleCancelled, "Raffle has been cancelled");
        require(!raffle.raffleEnded, "Raffle has already ended");
        require(
            raffle.totalSoldTickets >= (raffle.totalVolumeofTickets * 80) / 100,
            "Raffle can't be completed yet"
        );
        require(
            raffle.raffleCreator == msg.sender,
            "you are not the raffle owner"
        );

        uint256 winningTicket = pickRandomTicket(raffleId, requestId);

        uint winningTicketNumber = winningTicket;
        address winningTicketOwner = ticketToOwner[raffleId][winningTicketNumber];
        require(
            winningTicketOwner != address(0), "Winner has not been selected yet"
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
            goals: raffle.goals,
            nftPrice: raffle.nftPrice,
            totalVolumeofTickets: raffle.totalVolumeofTickets,
            endTime: raffle.endTime,
            nftName: raffle.nftName,
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