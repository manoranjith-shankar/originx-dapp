pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TestMintOrg is ERC721, Ownable {
    uint256 private _tokenIdCounter;

    constructor() ERC721("TestMintNFT", "TMN") {}

    function _baseURI() internal pure override returns (string memory) {
        return "https://www.google.com/url?sa=i&url=https%3A%2F%2Fnews.artnet.com%2Fnews-pro%2Fbored-ape-yacht-club-explainer-pro-2005001&psig=AOvVaw16tcBDe8Aj1idjWdjpfRx3&ust=1683354423212000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCNCGoYTG3f4CFQAAAAAdAAAAABAE";
    }

    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter;
        _safeMint(to, tokenId);
        _tokenIdCounter = tokenId + 1;
    }

    function safeMintBatch(address to, uint256 amount) public onlyOwner {
        require(amount > 0, "Number of tokens to mint must be greater than 0");
        for (uint256 i = 0; i < amount; i++) {
            uint256 tokenId = _tokenIdCounter;
            _safeMint(to, tokenId);
            _tokenIdCounter = tokenId + 1;
        }
    }

    function approveBatch(address operator, uint256[] memory tokenIds) public {
    for (uint256 i = 0; i < tokenIds.length; i++) {
        approve(operator, tokenIds[i]);
    }
    }
}