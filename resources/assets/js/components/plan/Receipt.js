import React from 'react'
import FormattedDate from './FormattedDate'
import RemoveButton from './RemoveButton'

const Receipt = (props) => {
  const receipt = props.data
  const { removeButtonClick } = props;
  return (
      <div className="plan receipt">
         {receipt.amount}
         <FormattedDate date={receipt.buy_date}/>
         <RemoveButton onClick={ removeButtonClick } />
      </div>
  );
}

export default Receipt