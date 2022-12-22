import { ethers } from "ethers";
// enter the contract address in the .env.local as 'NEXT_PUBLIC_CONTRACT_ADDRESS'
// in the root directory
export const bringinContractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
export const usdtContractAddress =
  process.env.NEXT_PUBLIC_USDT_CONTRACT_ADDRESS;
//import artifacts of the contract as 'Artifacts' here !!
// const Artifacts = "";
import BringinArtifact from "../artifacts/contracts/Bringin.sol/Bringin.json";
import UsdtArtifact from "../artifacts/contracts/USDTbringin.sol/USDTbringin.json";

export const firstFunc = async (
  setContract,
  setCurrentAccount,
  setCurrentNetworkId,
  setMetamaskConnected,
  setUsdtContract
) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const _signer = await provider.getSigner();
  const _currentNetworkId = window.ethereum.networkVersion;
  setCurrentNetworkId(_currentNetworkId);
  const accounts = await provider.listAccounts();
  if (accounts.length > 0) {
    setCurrentAccount(accounts[0]);
    setMetamaskConnected(true);
  } else {
    setMetamaskConnected(false);
  }
  const contract = await initialiseContract(
    bringinContractAddress,
    _signer,
    BringinArtifact
  );
  setContract(contract);
  const usdtContract = await initialiseContract(
    usdtContractAddress,
    _signer,
    UsdtArtifact
  );
  setUsdtContract(usdtContract);
};

export const initialiseContract = async (
  contractAddress,
  _signer,
  Artifacts
) => {
  if (!contractAddress) return;
  const _contract = new ethers.Contract(
    contractAddress,
    Artifacts.abi,
    _signer
  );
  return _contract;
};

export const connectMetamask = async (setMetamaskConnected) => {
  await window.ethereum
    .request({ method: "eth_requestAccounts" })
    .then((_) => {
      // handle when metamask connected successfully
      setMetamaskConnected(true);
    })
    .catch((err) => {
      console.log(err);
      //handle when metamask throws an error while connecting...
      setMetamaskConnected(false);
    });
};

export const checkMetamaskStatus = (
  setMetamaskConnected,
  setCurrentAccount,
  setCurrentNetworkId
) => {
  const accountChanged = (accounts) => {
    // when account changed
    setCurrentAccount(accounts[0] ? accounts[0] : "");
    console.log(accounts[0], "account changed");
    if (!accounts.length) {
      setMetamaskConnected(false);
    }
  };
  const disconnectAccount = () => {
    // handle when metamask disconnects
    setCurrentAccount("");
    console.log("disconnected account");
    setMetamaskConnected(false);
  };
  const connected = async () => {
    // when metamask connects
    const changedAccounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setCurrentAccount(changedAccounts[0]);
    console.log("connected");
    setMetamaskConnected(true);
  };
  const chainChainged = (chain) => {
    // when chainId changes
    const _currentNetworkId = parseInt(chain, 16);
    setCurrentNetworkId(_currentNetworkId);
  };
  window.ethereum.on("disconnect", disconnectAccount);
  window.ethereum.on("accountsChanged", accountChanged);
  window.ethereum.on("connect", connected);
  window.ethereum.on("chainChanged", chainChainged);
  return () => {
    window.ethereum.off("disconnect", disconnectAccount);
    window.ethereum.off("accountsChanged", accountChanged);
    window.ethereum.off("connect", connected);
    window.ethereum.off("chainChanged", chainChainged);
  };
};

export const listenToEvents = async (contract) => {
  if (!contract) return;

  const nameOfTheEvent1 = (...args) => {
    // will take all the arguments defined in this event in the smart-contract
  };

  const nameOfTheEvent2 = (...args) => {
    // will take all the arguments defined in this event in the smart-contract
  };

  contract.on("name_of_the_event1", nameOfTheEvent1);
  contract.on("name_of_the_event2", nameOfTheEvent2);

  return () => {
    contract.off("name_of_the_event1", nameOfTheEvent1);
    contract.off("name_of_the_event2", nameOfTheEvent2);
  };
};
