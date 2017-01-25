import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { addReceipt, searchStores, showAutocomplete } from '../../actions'
import { AsyncCreatable } from 'react-select';
import StoreAutocomplete from './StoreAutocomplete';

const validate = values => {
    const errors = {}

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
    getOptions: function(input, callback) {
        var {
            planData: { planId },
            dispatch
        } = this.props;
        dispatch(searchStores(input, planId));

    },
    getStores: function(input, callback) {
        var {
            planData: { planId },
            stores,
            dispatch
        } = this.props;
        dispatch(searchStores(input, planId));
        if (typeof stores === 'object') {
            stores = [];
        }
    },
    handleSubmit: function(newReceipt) {
        let {
            dispatch,
            planData,
        } = this.props;

        dispatch(addReceipt(newReceipt, planData.planId));
    },
    handleInputChange: function({ value }) {
        this.props.store.onChange(value)
    },
    onStoreChange: function(value, items) {
        var { fields: { store }} = this.props;
        return store.onChange(value.value);
    },
    render: function(){
        var {
            handleSubmit,
            planData,
            stores,
            autocomplete,
            dispatch
        } = this.props;

        var userRadioButtons = Object.keys(planData.users).map(function(data, index) {
            let user = planData.users[index];
            return (
                <div className="radio" key={ user.id }>
                    <label htmlFor={ 'user_' + user.id }>
                        <Field component="input" type="radio" name="user_id" id={ 'user_' + user.id } value={ user.id.toString() } />
                        { user.name }
                    </label>
                </div>
            );
        });

        return(
            <div className="addForm">
                <form onSubmit={handleSubmit(this.handleSubmit)}>
                    <div className="form-group">
                        <label htmlFor="amount">Summa:</label>
                        <Field type="text" component="input" name="amount" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="store">Butik:</label>
                        <Field
                            name="store"
                            component={StoreAutocomplete}
                            planData={planData}
                            options={stores.list}
                            getData={this.getStores}
                            autocomplete={autocomplete}
                            onFocus={() => {
                                return dispatch(showAutocomplete(true));
                            }}
                            onBlur={() => {
                                dispatch(showAutocomplete(false));
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="buy_date">Köpdatum:</label>
                        <Field component="input" type="date" name="buy_date" className="form-control" />
                    </div>
                    <div className="form-group">
                        { userRadioButtons }
                    </div>
                    <div className="form-group">
                        <label htmlFor="comment">Kommentar:</label>
                        <Field component="textarea" name="comment" className="form-control" />
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
    validate,
}
)(AddForm);

AddForm = connect(
    state => ({
        initialValues: state.newReceipt,
        autocomplete: state.autocomplete,
    })
)(AddForm);

export default AddForm
