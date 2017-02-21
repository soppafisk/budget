import React, { Component, Proptypes } from 'react'
import { connect } from 'react-redux'
import AddForm from '../components/plan/AddForm'
import MonthChooser from '../components/plan/MonthChooser'
import MonthSum from '../components/plan/MonthSum'
import { fetchReceipts, removeReceipt } from '../actions'
import Receipt from '../components/plan/Receipt'
import PlanHeader from '../components/plan/PlanHeader'
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
        let planData = plan.planData;
        let stores = this.props.stores;
        let { dispatch } = this.props;
        let removeButtonClick = this.removeButtonClick;
        let planId = this.props.params.planId;
        let users = planData.users;
        let receiptNodes = plan.receipts.map(function(data) {
            let receipt = data;

            let userId = receipt.user_id;
            let user = users.find(function(user){
                return user.id === userId;
            });
            return (
                <Receipt data={receipt} user={ user } key={ receipt.id } removeButtonClick={ () => dispatch(removeReceipt(receipt, planId)) }/>
            );
        })
        return (
            <div className="plan row">
                <div className="col-md-6">
                    <div className="row">
                        <MonthChooser
                            params={ this.props.params }
                            router={ history }
                            removeButtonClick={ () =>
                                dispatch(removeReceipt(receipt, planId))
                            }
                        />
                        <PlanHeader planData={ this.props.receipts.planData }/>
                    </div>
                    <div className="plan-list">
                        {receiptNodes}
                    </div>
                    <div className="plan-sum">
                        <MonthSum plan={ plan }/>
                    </div>
                </div>
                <div className="col-md-6">
                    <AddForm planData={ planData } stores={ stores } />
                </div>
            </div>
        );
    }
});

function mapStateToProps(state) {
    const { receipts, stores } = state
    return {
        receipts,
        stores,
    }
}

export default connect(mapStateToProps)(Plan)
