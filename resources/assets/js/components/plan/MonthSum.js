import React from 'react'

const MonthSum = (props) => {
  const { plan } = props;
  const receipts = plan.receipts;
  const users = plan.planData.users;

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

  const average = sum / users.length;
  calculatePay(result.concat(), sum, users);
  var resultNodes = result.map(function(res, userId) {

    var user = users.find(function(user){
        return user.id === userId;
    });
    let userSum = result[userId];

    return (
        <div className="result-row" key={ userId } >
            { user.name }: { userSum } kr ({ userSum - average } kr)
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

function calculatePay(result, sum, users) {
  var average = sum/users.length;
  var sorted = [];
  var transactions = [];
  result.forEach(function(userSum, userId) {
     sorted.push({userId: userId, sum: userSum });
  });
}
