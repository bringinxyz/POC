import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { changeLoad } from "../redux/action";
import ContractInfo from "./ContractInfo";
import CurrentAccount from "./CurrentAccount";
import { bringinContractAddress } from "./configureMetamask";

const Main = ({ state, changeLoad }) => {
  const { currentAccount, contractInstance, usdtContractInstance, load } =
    state;

  const [userAllowance, setUserAllowance] = useState("");
  const [usdtBalance, setUsdtBalance] = useState("");
  const [contractUsdtBalance, setContractUsdtBalance] = useState("");
  const [wei, setWei] = useState("");
  const [token, setToken] = useState("");
  const [funds, setFunds] = useState("");

  useEffect(() => {
    (async () => {
      await getData();
    })();
  }, [currentAccount, load]);

  const increaseAllowance = async () => {
    if (!currentAccount || !contractInstance.address)
      return alert("Some error occurred, try refreshing the page !!");
    try {
      const extra = prompt("How much more you wanted to give allowance ??");
      const tx = await usdtContractInstance.approve(
        currentAccount,
        bringinContractAddress,
        userAllowance + +extra
      );
      await tx.wait();
      changeLoad(!load);
    } catch (err) {
      console.log(err);
    }
  };
  const approveContract = async () => {
    if (!currentAccount || !contractInstance.address)
      return alert("Some error occurred, try refreshing the page !!");
    try {
      const tx = await usdtContractInstance.approve(
        currentAccount,
        bringinContractAddress,
        100
      );
      await tx.wait();
      changeLoad(!load);
    } catch (err) {
      console.log(err);
    }
  };

  const buyToken = async () => {
    if (!currentAccount || !usdtContractInstance.address)
      return alert("Some error occurred, try reloading the page !!");
    if (token <= 0) return alert("Enter valid amount of token !!");
    try {
      const tx = await usdtContractInstance.buyToken(token, { value: +wei });
      await tx.wait();
      changeLoad(!load);
      setToken("");
    } catch (err) {
      console.log(err);
    }
  };

  const getData = async () => {
    if (!currentAccount) return;
    try {
      const _usdtBalance = await usdtContractInstance.balanceOf(currentAccount);
      const _userAllowance = await usdtContractInstance.allowance(
        currentAccount,
        bringinContractAddress
      );
      const _contractUsdtBalance = await usdtContractInstance.balanceOf(
        bringinContractAddress
      );

      setContractUsdtBalance(_contractUsdtBalance.toNumber());
      setUserAllowance(_userAllowance.toNumber());
      setUsdtBalance(_usdtBalance.toNumber());
    } catch (err) {
      console.log(err);
    }
  };
  const pullFunds = async () => {
    if (!contractInstance.address || !currentAccount)
      return alert("Some error occurred, try relaoding the page !!");
    if (+funds <= 0) return alert("Enter valid fund detail !!");
    try {
      const tx = await contractInstance.pullFunds(currentAccount, +funds);
      await tx.wait();
      changeLoad(!load);
      setFunds("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="main">
      <div className="main__container">
        <ContractInfo contractBalance={contractUsdtBalance} />
        <CurrentAccount
          allowance={userAllowance}
          balance={usdtBalance}
          account={currentAccount}
          approveContract={approveContract}
          increaseAllowance={increaseAllowance}
        />
      </div>
      <div className="main__btn-container">
        <input
          placeholder="Enter amount to be pulled in the contract"
          type="number"
          value={funds}
          onChange={(e) => setFunds(e.target.value)}
        />
        <button onClick={pullFunds} className="btn-primary">
          Pull Funds
        </button>
      </div>
      <div className="main__buy-container">
        <input
          onChange={(e) => {
            const cur = e.target.value;
            setWei(cur * 10 ** 6);
            setToken(cur);
          }}
          value={token}
          className="buy__input"
          placeholder="Enter amount of token, without decimals"
          type="number"
        />
        <button onClick={buyToken} className="btn-primary">
          Buy Token
        </button>
        {token && (
          <div className="main__buy-container--token-predict">
            You will spend <span>{wei} Wei</span>.
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({ state });

export default connect(mapStateToProps, { changeLoad })(Main);
