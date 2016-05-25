import React, { Component, Proptypes } from 'react'
import { connect } from 'react-redux'
import AddForm from '../components/plan/AddForm'
import { fetchReceipts, removeReceipt } from '../actions'
import Receipt from '../components/plan/Receipt'
var $ = require('jquery');

const Plan = React.createClass({
    componentDidMount: function() {
        const {
            dispatch,
            plan,
            params
        } = this.props;

        dispatch(fetchReceipts(params.planId));
    },
    render: function() {
        let plan = this.props.receipts;
        let removeButtonClick = this.removeButtonClick;
        let planId = this.props.params.planId;
        let receiptNodes = plan.receipts.map(function(data) {
            let receipt = data;
            return (
                <Receipt data={receipt} key={ receipt.id } removeButtonClick={ () => removeReceipt(receipt, planId) }/>
            );
        })
        return (
            <div className="plan">
                {receiptNodes}
                <AddForm planId={ planId } />
            </div>
        );
    }
});

function mapStateToProps(state) {
    const { receipts } = state
    return {
        receipts,
    }
}

export default connect(mapStateToProps)(Plan)