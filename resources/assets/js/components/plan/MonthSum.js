import React from 'react'

const MonthSum = (props) => {
  const { plan } = props;
  const receipts = plan.receipts;
  const users = plan.planData.users;
  console.log(users);
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

  var resultNodes = result.map(function(res, userId) {
    let user = users.find(function(user){
        return user.id === userId;
    });

    return (
        <div className="result-row" key={ userId } >
            { user.name }: { result[userId] } kr
        </div>
    );
  });

  return (
      <div className="result">
        { resultNodes }
        summa: { sum } kr
      </div>
  );
}

export default MonthSum

