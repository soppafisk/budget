import React from 'react'

const MonthSum = (props) => {
  const { plan } = props;
  const receipts = plan.receipts;

  var result = [];
  var sum = 0;

  receipts.map(function(receipt) {
    let { user_id, amount } = receipt;
    sum += amount;

    if (!(user_id in result)) {
      result[user_id] = amount;
    } else {
      result[user_id] += amount;
    }
  });

  var resultNodes = result.map(function(res, index) {

    return (
        <div className="result-row" key={ index} >
            { index }: { result[index] }
        </div>
    );
  });

  return (
      <div className="result">
        { resultNodes }
        summa: { sum }
      </div>
  );
}

export default MonthSum

