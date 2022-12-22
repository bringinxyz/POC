const ContractInfo = ({ contractBalance = "" }) => {
  return (
    <div className="contract">
      <div className="contract__title">Bringin Smart contract</div>
      <div className="contract__item">
        <div className="contract__item--key">Balance: </div>
        <div className="contract__item--value">{contractBalance}</div>
      </div>
    </div>
  );
};

export default ContractInfo;
