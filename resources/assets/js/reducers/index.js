var initialState = {
    receipts: [],
    planData: {}
};

export function receiptReducer(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_RECEIPTS':
            return Object.assign({}, state, {
                receipts: action.receipts
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