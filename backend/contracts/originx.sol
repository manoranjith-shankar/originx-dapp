// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

interface IERC721 {
    function transferFrom(address from, address to, uint256 tokenId) external;
}

contract Lottery {
    struct raffle {
    address creator;
    address nftContractAddress;
    uint256 tokenId;
    uint256 nftPrice;
    uint256 totalVolumeOfTickets;
    uint256 ticketPrice;
    uint256 endTime;
    uint256 soldTickets;
    uint256 jackpot;
    bool ended;
    mapping(address => uint256) ticketsByAddress;
    }


function createLottery(address _nftContractAddress, uint256 _tokenId, uint256 _nftPrice, uint256 _totalVolumeOfTickets, uint256 _endTime) public returns (bytes32) {
    require(_nftPrice > 0, "NFT price must be greater than zero");
    require(_totalVolumeOfTickets > 0, "Total volume of tickets must be greater than zero");
    require(_endTime > block.timestamp, "End time must be in the future");

    uint256 ticketPrice = (_nftPrice * 50) / 100 + _nftPrice;
    bytes32 raffleId = keccak256(abi.encodePacked(msg.sender, block.timestamp));

    raffle memory newRaffle = raffle({
        creator: msg.sender,
        nftContractAddress: _nftContractAddress,
        tokenId: _tokenId,
        nftPrice: _nftPrice,
        totalVolumeOfTickets: _totalVolumeOfTickets,
        ticketPrice: ticketPrice,
        endTime: _endTime,
        soldTickets: 0,
        jackpot: 0,
        ended: false
    });

    for (uint i = 0; i < _totalVolumeOfTickets; i++) {
        newRaffle.ticketsByAddress[msg.sender] = 0;
    }

    raffles[raffleId] = newRaffle;

    return raffleId;
    }

 
    function buyTicket(bytes32 _raffleId) public payable {
    Raffle storage raffle = raffles[_raffleId];
    
    require(!raffle.ended, "Lottery has already ended");
    require(raffle.soldTickets < raffle.totalVolumeOfTickets, "Lottery is sold out");
    require(block.timestamp < raffle.endTime, "Lottery has ended");
    require(msg.value == raffle.ticketPrice, "Incorrect ticket price");
    
    IERC721(raffle.nftContractAddress).transferFrom(raffle.creator, msg.sender, raffle.tokenId);
    
    raffle.tickets[msg.sender] += 1;
    raffle.soldTickets += 1;
    raffle.jackpot += msg.value;
    
    emit TicketPurchased(_raffleId, msg.sender, msg.value);
    
    if (raffle.soldTickets == raffle.totalVolumeOfTickets) {
        endLottery(_raffleId);
    }
    }

function endLottery(bytes32 _raffleId) private {
    Raffle storage raffle = raffles[_raffleId];
    
    require(!raffle.ended, "Lottery has already ended");
    require(block.timestamp >= raffle.endTime, "Lottery has not ended yet");
    
    uint256 winnerTicket = uint256(keccak256(abi.encodePacked(blockhash(block.number - 1), block.coinbase, _raffleId))) % raffle.totalVolumeOfTickets;
    address winner = address(0);
    uint256 currentTicket = 0;
    
    for (uint256 i = 0; i < raffle.totalVolumeOfTickets; i++) {
        address ticketOwner = getTicketOwner(_raffleId, i);
        
        if (ticketOwner != address(0)) {
            currentTicket += 1;
            
            if (currentTicket == winnerTicket + 1) {
                winner = ticketOwner;
                break;
            }
        }
    }
    
    require(winner != address(0), "Lottery winner could not be determined");
    
    IERC721(raffle.nftContractAddress).transferFrom(raffle.creator, winner, raffle.tokenId);
    
    payable(winner).transfer(raffle.jackpot);
    
    raffle.ended = true;
    
    emit LotteryEnded(_raffleId, winner, raffle.jackpot);
    }

    function cancelLottery(bytes32 _raffleId) public {
        Raffle storage raffle = raffles[_raffleId];
        
        require(msg.sender == raffle.creator, "Only the creator can cancel the lottery");
        require(!raffle.ended, "Lottery has already ended");
        
        IERC721(raffle.nftContractAddress).transferFrom(address(this), raffle.creator, raffle.tokenId);
        
        raffle.ended = true;
        
        emit LotteryCancelled(_raffleId, msg.sender);
    }

    function getTicketOwner(bytes32 _raffleId, uint256 _ticketNumber) public view returns (address) {
    require(_ticketNumber < raffles[_raffleId].totalVolumeOfTickets, "Invalid ticket number");
    
    return raffles[_raffleId].tickets[_ticketNumber] != 0 ? address(this) : address(0);
    }

    }
