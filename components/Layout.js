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
  changeUsdtContractInstance,
} from "../redux/action";
import Main from "./Main";

const Layout = ({
  children,
  changeContractInstance,
  changeMetamaskConnectFunction,
  changeCurrentAccount,
  changeLoad,
  changeNetworkId,
  changeMetamaskStatus,
  state,
  changeUsdtContractInstance,
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
      changeMetamaskStatus,
      changeUsdtContractInstance
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
      {!metamaskStatus ? (
        <button onClick={() => metamaskConnectFunction(changeMetamaskStatus)}>
          Connect Metamask
        </button>
      ) : (
        <>
          {children}
          <Main />
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
  changeUsdtContractInstance,
})(Layout);
