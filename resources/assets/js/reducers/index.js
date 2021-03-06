var initialState = {
    receipts: [],
    planData: { users: [] }
};

export function receiptReducer(state = initialState, action) {
    switch (action.type) {
        case 'UPDATE_RECEIPTS':
            return Object.assign({}, state, {
                receipts: action.receipts,
                planData: action.planData,
            });

        case 'ADD_RECEIPT':
            return Object.assign({}, state, {
                receipts: [
                    ...state.receipts,
                    action.receipt
                ]
            });

        case 'REMOVE_RECEIPT':
            var i = state.receipts.indexOf(action.receipt);

            return Object.assign({}, state, {
                receipts: [
                    ...state.receipts.slice(0, i),
                    ...state.receipts.slice(i + 1)
                ]
            });
        default:
            return state;
    }
}

const initialNewReceiptState = {
    store: '',
    amount: 0,
    buy_date: new Date(),
    user_id: 0,
    comment: '',
}

export function newReceipt(state = initialNewReceiptState, action) {
    switch (action.type) {
        default:
            return state;
    }
}

export function planData(state = {}, action) {
    switch (action.type) {
        case 'CHANGE_MONTH':
            return Object.assign({}, state, {
                year: action.year,
                month: action.month,
            });
        default:
            return state;
    }
}

export function storesReducer(state = {list:[]}, action) {
    switch (action.type) {
        case 'UPDATE_STORES':
            return Object.assign({}, state, {
                list: action.stores
            });
        default:
            return state;
    }
}

export function autocomplete(state = { shouldShow: false }, action) {
    switch (action.type) {
        case 'HIDE_AUTOCOMPLETE':
            return Object.assign({}, state, {
                shouldShow: false
            });
        case 'SHOW_AUTOCOMPLETE':
            return Object.assign({}, state, {
                shouldShow: true
            });
        default:
            return state;
    }
}
