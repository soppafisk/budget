import React from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { addReceipt } from '../../actions'

var AddForm = React.createClass({
    handleSubmit: function(newReceipt) {
        let {
            dispatch,
            handleSubmit,
            planId
        } = this.props;

        dispatch(addReceipt(newReceipt, planId));
    },
    render: function(){

        var { 
            fields: { amount, store, buy_date, comment },
            handleSubmit,
            planId
        } = this.props;
        return(
            <div className="addForm col-md-6">
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
                        <input type="date" name="buy_date" className="form-control" {...buy_date}/>
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
    fields: ['amount', 'store', 'buy_date', 'comment'],
},
state => ({
    initialValues: state.newReceipt,
})
)(AddForm);

export default AddForm