const hre = require("hardhat");

const main = async () => {
  const { ethers } = hre;

  const USDTAddressGoerli = "0x509Ee0d083DdF8AC028f2a56731412edD63223B9";

  const Contract = await ethers.getContractFactory("Bringin");
  const contract = await Contract.deploy(USDTAddressGoerli);

  await contract.deployed();

  console.log(`Contract address: ${contract.address}`);
};

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
