import React, { Component, Proptypes } from 'react'
import { connect } from 'react-redux'
import AddForm from '../components/plan/AddForm'
import MonthChooser from '../components/plan/MonthChooser'
import { fetchReceipts, removeReceipt } from '../actions'
import Receipt from '../components/plan/Receipt'
var $ = require('jquery');

const Plan = React.createClass({
    componentDidMount: function() {
        const {
            dispatch,
            plan,
            params,
            history
        } = this.props;

        const { month, year } = params;

        dispatch(fetchReceipts(params.planId, year, month));
    },
    componentWillReceiveProps: function(nextProps) {

        if (nextProps.params !== this.props.params) {
          const {
              dispatch,
              params,
          } = nextProps;

          const { month, year } = params;

          dispatch(fetchReceipts(params.planId, year, month));
        }

    },
    render: function() {
        let plan = this.props.receipts;
        let { dispatch } = this.props;
        let removeButtonClick = this.removeButtonClick;
        let planId = this.props.params.planId;
        let receiptNodes = plan.receipts.map(function(data) {
            let receipt = data;
            return (
                <Receipt data={receipt} key={ receipt.id } removeButtonClick={ () => dispatch(removeReceipt(receipt, planId)) }/>
            );
        })
        return (
            <div className="plan row">

                <div className="col-md-6">
                    <MonthChooser params={ this.props.params } router={ history } removeButtonClick={ () => dispatch(removeReceipt(receipt, planId)) } />
                    <div className="plan-list">
                        {receiptNodes}
                    </div>
                </div>
                <div className="col-md-6">
                    <AddForm planId={ planId } />
                </div>
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