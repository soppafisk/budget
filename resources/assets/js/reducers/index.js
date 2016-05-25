var initialState = {
    receipts: [],
    planData: {}
};

export function receiptReducer(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_RECEIPTS':
            console.log(action.receipts);
            return Object.assign({}, state, {
                receipts: action.receipts
            })
        default:
            return state;
    }
}

export function visibilityFilter(state = 'SHOW_ALL', action) {
    switch (action.type) {
        default:
            return state;

    }
}

const initialNewReceiptState = {
    store: '',
    sum: 0,
    buy_amount: '',
    date: new Date(),
    comment: '',
}

export function newReceipt(state = initialNewReceiptState, action) {
    switch (action.type) {
        default:
            return state;
    }
}