const hre = require("hardhat");

const main = async () => {
  const { ethers } = hre;

  const USDTbContract = await ethers.getContractFactory("USDTbringin");
  const usdtBContract = await USDTbContract.deploy();

  await usdtBContract.deployed();

  const Contract = await ethers.getContractFactory("Bringin");
  const contract = await Contract.deploy(usdtBContract.address);

  await contract.deployed();

  console.log(
    `Contract address: ${contract.address}, USDTb contract: ${usdtBContract.address}`
  );
};

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
