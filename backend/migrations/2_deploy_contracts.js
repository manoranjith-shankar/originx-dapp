const MainNftRaffle = artifacts.require("mainNftRaffle");
const BoredApeNFT = artifacts.require("BoredApeYachtClub");
const DoodlesNFT = artifacts.require("Doodles");
const IFNfts = artifacts.require("InvisibleFriends");
const CloneX = artifacts.require("CloneX");

module.exports = function(deployer) {
  deployer.deploy(MainNftRaffle);
  deployer.deploy(BoredApeNFT);
  deployer.deploy(DoodlesNFT);
  deployer.deploy(IFNfts);
  deployer.deploy(CloneX);
};