const CurrentAccount = ({
  account = "",
  allowance = "",
  balance = "",
  approveContract,
  increaseAllowance,
}) => {
  return (
    <div className="account">
      <div className="account__upper">
        <div className="account__upper--item">
          <div className="account__upper--item__key">To: </div>
          <div className="account__upper--item__value">{account}</div>
        </div>
        <div className="account__upper--item">
          <div className="account__upper--item__key">Allowance: </div>
          <div className="account__upper--item__value">{allowance}</div>
        </div>
        <div className="account__upper--item">
          <div className="account__upper--item__key">Balance: </div>
          <div className="account__upper--item__value">{balance}</div>
        </div>
      </div>
      <div className="account__lower">
        {!allowance ? (
          <button onClick={approveContract} className="btn-primary">
            Approve Contract
          </button>
        ) : (
          <button onClick={increaseAllowance} className="btn-primary">
            Increase Allowance
          </button>
        )}
      </div>
    </div>
  );
};

export default CurrentAccount;
