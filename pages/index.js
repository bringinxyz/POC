import { useState, useEffect } from "react";
import {
  contractAddress,
  checkMetamaskStatus,
  connectMetamask,
  firstFunc,
  listenToEvents,
} from "../components/configureMetamask";

const Main = () => {
  const [metamaskConnected, setMetamaskConnected] = useState(false);
  const [contractInstance, setContractInstance] = useState();
  const [currentAccount, setCurrentAccount] = useState("");
  const [currentNetworkId, setCurrentNetworkId] = useState("");
  //for forcing to update the values of states
  const [load, setLoad] = useState(false);

  //default
  useEffect(() => {
    firstFunc(
      setContractInstance,
      setCurrentAccount,
      setCurrentNetworkId,
      setMetamaskConnected
    );
    checkMetamaskStatus(
      setMetamaskConnected,
      setCurrentAccount,
      setCurrentNetworkId
    );
  }, []);

  // for updating the change when metamask configuration changes !!
  useEffect(() => {
    // function to update the values of state
    //    getContractData();
    // for listening of events
    //    listenToEvents(contract);
  }, [currentAccount, contractInstance, load]);

  return (
    <>
      <h1>Hello, Blockchain !!</h1>
      {!metamaskConnected && (
        <button onClick={() => connectMetamask(setMetamaskConnected)}>
          Connect Metamask
        </button>
      )}
      <h3>Contract address: {contractAddress}</h3>
      <h4>Current account: {currentAccount}</h4>
      <h4>Current chain-id: {currentNetworkId}</h4>
    </>
  );
};

export default Main;
