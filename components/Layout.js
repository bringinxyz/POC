import { useEffect } from "react";
import {
  contractAddress,
  checkMetamaskStatus,
  connectMetamask,
  firstFunc,
  listenToEvents,
} from "./configureMetamask";

import { connect } from "react-redux";
import {
  changeContractInstance,
  changeLoad,
  changeCurrentAccount,
  changeMetamaskConnectFunction,
  changeMetamaskStatus,
  changeNetworkId,
} from "../redux/action";

const Layout = ({
  children,
  changeContractInstance,
  changeMetamaskConnectFunction,
  changeCurrentAccount,
  changeLoad,
  changeNetworkId,
  changeMetamaskStatus,
  state,
}) => {
  const {
    contractInstance,
    currentAccount,
    load,
    networkId,
    metamaskStatus,
    metamaskConnectFunction,
  } = state;

  //default
  useEffect(() => {
    firstFunc(
      changeContractInstance,
      changeCurrentAccount,
      changeNetworkId,
      changeMetamaskStatus
    );
    checkMetamaskStatus(
      changeMetamaskStatus,
      changeCurrentAccount,
      changeNetworkId
    );
    changeMetamaskConnectFunction(connectMetamask);
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
      {!metamaskStatus ? (
        <button onClick={() => metamaskConnectFunction(changeMetamaskStatus)}>
          Connect Metamask
        </button>
      ) : (
        <>
          {children}
          <h3>Contract address: {contractAddress}</h3>
          <h4>Current account: {currentAccount}</h4>
          <h4>Current chain-id: {networkId}</h4>
        </>
      )}
    </>
  );
};

const mapStateToState = (state) => ({ state });
export default connect(mapStateToState, {
  changeContractInstance,
  changeMetamaskConnectFunction,
  changeCurrentAccount,
  changeLoad,
  changeNetworkId,
  changeMetamaskStatus,
})(Layout);
