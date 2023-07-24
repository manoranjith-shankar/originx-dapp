const MainNftRaffle = artifacts.require("mainNftRaffle");
const BoredApeNFT = artifacts.require("BoredApeYachtClub");
const DoodlesNFT = artifacts.require("Doodles");

module.exports = function(deployer) {
  deployer.deploy(MainNftRaffle);
  deployer.deploy(BoredApeNFT);
  deployer.deploy(DoodlesNFT);
};