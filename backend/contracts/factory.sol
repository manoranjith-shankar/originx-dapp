// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./fractionalizer.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

// update: the fractionalizer works properly, integrate it with the originx-v2 main contract
// and correct the functionalities of secondary fractionalizer functions.
contract NFTFractionalizerFactory is Ownable, IERC721Receiver {
    // Event emitted when a new NFTFractionalizer contract is deployed
    event FractionalizerDeployed(address indexed fractionalizer, address indexed nft, uint256 tokenId);

    // Deploy a new NFTFractionalizer contract
    function deployFractionalizer(
        string memory nftName,
        string memory nftSymbol,
        address _nftContractAddress,
        uint256 _nftId
    ) external onlyOwner {
        IERC721 nftContract = IERC721(_nftContractAddress);
        nftContract.safeTransferFrom(msg.sender, address(this), _nftId);
        NFTFractionalizer fractionalizer = new NFTFractionalizer(nftName, nftSymbol, _nftContractAddress, _nftId);
        emit FractionalizerDeployed(address(fractionalizer), _nftContractAddress, _nftId);
        nftContract.approve(address(fractionalizer), _nftId);
    }

    // Fractionalize NFT in a specific NFTFractionalizer instance
    function fractionalize(address fractionalizer, uint256 _amount) external onlyOwner {
        
        NFTFractionalizer(fractionalizer).fractionalize(_amount);
    }

    // Redeem NFT in a specific NFTFractionalizer instance
    function redeem(address fractionalizer, uint256 amount) external onlyOwner {
        NFTFractionalizer(fractionalizer).redeem(amount);
    }

    function checkBalanceOfAccount(address fractionalizer, address account) external view returns (uint256) {
        return NFTFractionalizer(fractionalizer).checkBalance(account);
    }

    function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) external returns (bytes4) {
        return this.onERC721Received.selector;
    }
}