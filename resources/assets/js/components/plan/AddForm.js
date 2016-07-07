import React from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { addReceipt } from '../../actions'

const validate = values => {
    const errors = {}
    console.log(values)

    if (!values.user_id) {
        errors.user_id = "Välj användare"
    }

    if (!values.amount) {
        errors.amount = "Ange summa"
    }

    if (!values.buy_date) {
        errors.buy_date = "Ange datum"
    }

    if (!values.store) {
        errors.store = "Ange butik"
    }

    return errors
}

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
                        { amount.touched && amount.error }
                    </div>
                    <div className="form-group">
                        <label htmlFor="store">Butik:</label>
                        <input type="text" name="store" className="form-control autocomplete" {...store}/>
                        { store.touched && store.error }
                    </div>
                    <div className="form-group">
                        <label htmlFor="buy_date">Köpdatum:</label>
                        <input type="date" name="buy_date" className="form-control" {...buy_date} />
                        { buy_date.touched && buy_date.error }
                    </div>
                    <div className="form-group">
                        { userRadioButtons }
                        { user_id.touched && user_id.error }
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
    validate,
},
state => ({
    initialValues: state.newReceipt,
})
)(AddForm);

export default AddForm
