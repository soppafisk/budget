import React from 'react'
import FormattedDate from './FormattedDate'
import RemoveButton from './RemoveButton'

const Receipt = (props) => {
  const receipt = props.data
  const { removeButtonClick } = props;

  return (
      <div className="plan receipt item">
        <div className="receipt amount">
            { receipt.amount } kr
        </div>
        <div className="receipt buy-date">
            <FormattedDate date={receipt.buy_date}/>
        </div>
        <div className="receipt store">
            { receipt.store.name }
        </div>
        <RemoveButton onClick={ removeButtonClick } />
      </div>
  );
}

export default Receipt