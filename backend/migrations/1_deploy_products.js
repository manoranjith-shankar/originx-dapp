
const originx = artifacts.require("../contracts/originx.sol");

module.exports = async function (deployer) {
    await deployer.deploy(originx);
};
