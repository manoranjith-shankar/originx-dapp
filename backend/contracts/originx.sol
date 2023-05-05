// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.0 <0.9.0;

contract OriginXCharityRaffle {
    
    struct Raffle {
        uint256 raffleID;
        address raffleCreator;
        address nftOwner;
        string raffleName;
        address charityAddress;
        uint256 depositId;
        uint256 nftPrice;
        uint256 totalVolumeofTickets;
        uint256 ticketPrice;
        uint256 ticketSold;
        uint256 endTime;
        bool isCancelled;
        bool isCompleted;
        uint256 winningTicket;
        bool hasWinner;
    }

    mapping(uint256 => Raffle) public raffles;
    uint256 public currentRaffleID;
    mapping(address => uint256[]) public nftDeposits;
    
    mapping(uint256 => mapping(address => uint256[])) public raffleTickets;
    mapping(uint256 => mapping(uint256 => address)) public ticketOwners;
    
    mapping(uint256 => bool) public pickedTickets;
    uint256 public randomSeed;
    
    address payable public charity;
    address payable public developmentTeam;
    
    event RaffleCreated(uint256 indexed raffleID, address indexed raffleCreator, string raffleName, address indexed charityAddress, uint256 depositId, uint256 nftPrice, uint256 totalVolumeofTickets, uint256 endTime);
    event TicketBought(uint256 indexed raffleID, address indexed buyer, uint256 ticketNumber);
    event RaffleExtended(uint256 indexed raffleID, uint256 newEndTime);
    event WinnerPicked(uint256 indexed raffleID, address indexed winner, uint256 winningTicket);
    event RaffleCancelled(uint256 indexed raffleID);

    constructor(address payable _charity, address payable _developmentTeam) {
        charity = _charity;
        developmentTeam = _developmentTeam;
    }

    modifier onlyRaffleCreator(uint256 _raffleID) {
        require(msg.sender == raffles[_raffleID].raffleCreator, "Only raffle creator can perform this operation");
        _;
    }

    modifier onlyValidRaffle(uint256 _raffleID) {
        require(_raffleID <= currentRaffleID, "Invalid raffle ID");
        require(!raffles[_raffleID].isCancelled, "This raffle has been cancelled");
        require(!raffles[_raffleID].isCompleted, "This raffle has already completed");
        _;
    }

    function depositNft() external returns (uint256[4] memory depositId) {
        require(msg.sender != address(0), "Invalid address");
        depositId = [block.timestamp, currentRaffleID, nftDeposits[msg.sender].length, random()];
        nftDeposits[msg.sender].push(currentRaffleID);
    }

    function createRaffle(string calldata _raffleName, address _charityAddress, uint256 _depositId, uint256 _nftPrice, uint256 _totalVolumeofTickets, uint256 _endTime) external returns (uint256[4] memory raffleID) {
        require(msg.sender != address(0), "Invalid address");
        require(_nftPrice > 0, "NFT price must be greater than 0");
        require(_totalVolumeofTickets > 0, "Total volume of tickets must be greater than 0");
        require(_endTime > block.timestamp, "End time must be in the future");
    currentRaffleID++;
    raffleID = [block.timestamp, currentRaffleID, 0, random()];
    
    Raffle memory newRaffle = Raffle({
        raffleID: currentRaffleID,
        raffleCreator: msg.sender,
        nftOwner: address(0),
        raffleName: _raffleName,
        charityAddress: _charityAddress,
        depositId: _depositId,
        nftPrice: _nftPrice,
        totalVolumeofTickets: _totalVolumeofTickets,
        ticketPrice: _nftPrice/_totalVolumeofTickets,
        ticketSold: 0,
        endTime: _endTime,
        isCancelled: false,
        isCompleted: false,
        winningTicket: 0,
        hasWinner: false
    });
    
    raffles[currentRaffleID] = newRaffle;
    
    emit RaffleCreated(currentRaffleID, msg.sender, _raffleName, _charityAddress, _depositId, _nftPrice, _totalVolumeofTickets, _endTime);
    
    return raffleID;
}

function buyTicket(uint256 _raffleID, uint256 _ticketNumber) external payable onlyValidRaffle(_raffleID) {
    require(msg.sender != address(0), "Invalid address");
    require(msg.value == raffles[_raffleID].ticketPrice, "Invalid ticket price");
    require(raffleTickets[_raffleID][msg.sender].length < raffles[_raffleID].totalVolumeofTickets, "You can't buy more tickets");
    require(!pickedTickets[_ticketNumber], "This ticket is already picked");
    
    raffles[_raffleID].ticketSold++;
    pickedTickets[_ticketNumber] = true;
    raffleTickets[_raffleID][msg.sender].push(_ticketNumber);
    ticketOwners[_raffleID][_ticketNumber] = msg.sender;
    
    emit TicketBought(_raffleID, msg.sender, _ticketNumber);
    
    if(raffles[_raffleID].ticketSold == raffles[_raffleID].totalVolumeofTickets){
        completeRaffle(_raffleID);
    }
}

function extendRaffleEndTime(uint256 _raffleID, uint256 _newEndTime) external onlyRaffleCreator(_raffleID) onlyValidRaffle(_raffleID) {
    require(_newEndTime > raffles[_raffleID].endTime, "New end time must be greater than current end time");
    raffles[_raffleID].endTime = _newEndTime;
    
    emit RaffleExtended(_raffleID, _newEndTime);
}

function pickWinner(uint256 _raffleID) external onlyRaffleCreator(_raffleID) onlyValidRaffle(_raffleID) {
    require(raffles[_raffleID].endTime <= block.timestamp, "Raffle has not ended yet");
    require(!raffles[_raffleID].hasWinner, "Winner has already been picked");
    
    randomSeed = random();
    uint256 winningTicket = (randomSeed % raffles[_raffleID].totalVolumeofTickets) + 1;
    raffles[_raffleID].winningTicket = winningTicket;
    raffles[_raffleID].hasWinner = true;
    address winner = ticketOwners[_raffleID][winningTicket];
    winner.transfer(address(this).balance);
    
    emit WinnerPicked(_raffleID, winner, winningTicket);
} 
function cancelRaffle(uint256 _raffleID) external onlyRaffleCreator(_raffleID) onlyValidRaffle(_raffleID) {
raffles[_raffleID].isCancelled = true;
emit RaffleCancelled(_raffleID);
}

function random() private returns (uint256) {
randomSeed += uint256(keccak256(abi.encodePacked(msg.sender, tx.origin, block.timestamp, block.difficulty, randomSeed)));
return randomSeed;
}

function withdraw() external {
require(msg.sender == developmentTeam, "Only development team can withdraw funds");
payable(msg.sender).transfer(address(this).balance);
}

}