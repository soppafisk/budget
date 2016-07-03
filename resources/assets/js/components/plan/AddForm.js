import React from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { addReceipt } from '../../actions'

var AddForm = React.createClass({
    handleSubmit: function(newReceipt) {
        let {
            dispatch,
            handleSubmit,
            planData,
        } = this.props;

        dispatch(addReceipt(newReceipt, planData.planId));
    },
    render: function(){

        var {
            fields: { amount, store, buy_date, user_id, comment },
            handleSubmit,
            planData,
        } = this.props;

        var userRadioButtons = planData.users.map(function(user) {
            return (
                <div key={ user.id }>
                    <label for={ 'user_' + user.id }>{ user.name }</label>
                    <input type="radio" {...user_id} name="user_id" id={ 'user_' + user.id } value={ user.id } />
                </div>
            );
        });

        return(
            <div className="addForm">
                <form onSubmit={handleSubmit(this.handleSubmit)}>
                    <div className="form-group">
                        <label htmlFor="amount">Summa:</label>
                        <input type="text" name="amount" className="form-control" {...amount} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="store">Butik:</label>
                        <input type="text" name="store" className="form-control autocomplete" {...store}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="buy_date">Köpdatum:</label>
                        <input type="date" name="buy_date" className="form-control" {...buy_date} />
                    </div>
                    <div className="form-group">
                        { userRadioButtons }
                    </div>
                    <div className="form-group">
                        <label htmlFor="comment">Kommentar:</label>
                        <textarea className="form-control" {...comment} value={comment.value || ''}/>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary form-control">
                            Add
                        </button>
                    </div>
                </form>
            </div>
        );

    }
});

AddForm = reduxForm({
    form: 'addReceiptForm',
    fields: ['amount', 'store', 'buy_date', 'user_id', 'comment'],
},
state => ({
    initialValues: state.newReceipt,
})
)(AddForm);

export default AddForm
