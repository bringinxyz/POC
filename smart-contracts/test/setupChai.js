const chai = require("chai");
const { solidity } = require("ethereum-waffle");
const chaiAsBn = require("chai-bn");
const chaiAsPromised = require("chai-as-promised");
const { should } = chai;
const web3 = require("web3");

const BN = web3.utils.BN;
const chaiBN = chaiAsBn(BN);

chai.use(chaiAsPromised);
chai.use(chaiBN);
chai.use(should);
chai.use(solidity);

module.exports = chai;
