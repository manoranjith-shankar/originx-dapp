// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTFractionalizer is ERC20, Ownable {
    IERC721 public nft; // ERC721 NFT contract address
    uint256 public tokenId; // ID of the specific NFT to be fractionalized

    constructor(
        string memory nftName,
        string memory nftSymbol,
        address _nft,
        uint256 _tokenId
    ) ERC20(string(abi.encodePacked("x", nftName)), string(abi.encodePacked("x", nftSymbol))) {
        nft = IERC721(_nft);
        tokenId = _tokenId;
    }

    // Fractionalize the NFT
    function fractionalize(uint256 _amount) external onlyOwner {
        require(nft.ownerOf(tokenId) == msg.sender, "You are not the owner of the NFT");
        nft.transferFrom(msg.sender, address(this), tokenId);
        _mint(msg.sender, _amount * (10**decimals())); // Mint 20 fractional tokens
    }

    // Redeem the original NFT with fractional tokens
    function redeem(uint256 _amount) external onlyOwner {
        require(balanceOf(msg.sender) >= _amount * (10**decimals()), "Insufficient fractional tokens");
        _burn(msg.sender, _amount * (10**decimals()));
        nft.transferFrom(address(this), msg.sender, tokenId);
    }

    // Custom function to check the balance of a specific address
    function checkBalance(address account) external view returns (uint256) {
        return balanceOf(account);
    }
}