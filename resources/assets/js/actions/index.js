var $ = require('jquery');
import fetch from 'isomorphic-fetch'

function getApiUrl(id) {
    return "/api/plan/" + id; 
}

function getAuthToken() {
    return 'Bearer ' + $('meta[name="data-token"]').attr('content');
}

export function fetchReceipts(planId, month) {
    return dispatch => {
        fetch(getApiUrl(planId) + '/month/5')
        .then(result => result.json())
        .then(result => dispatch({
            type: 'FETCH_RECEIPTS',
            receipts: result.receipts
        }));
    };
}

export function addReceipt(receipt, planId) {
    var auth = getAuthToken();

    return dispatch => {
        fetch(getApiUrl(planId) + '/receipt', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': auth,
            },
            body: JSON.stringify({
                receipt: receipt,
            })
        })
        .then(res => res.json())
        .then(res => {
            if (res.status >= 200 && res.status < 300) {
                dispatch({
                    type: 'ADD_RECEIPT',
                    receipt: res.receipt
                });
            }
        });
    }
}

export function removeReceipt(receipt, planId) {
    var url = getApiUrl(planId) + '/receipt/' + receipt.id;

    return dispatch => {
        fetch(url, {
            method: 'DELETE',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': getAuthToken(),
            },
            body: JSON.stringify({
                receipt: receipt,
            })
        })
        .then(res => {
            if (res.status >= 200 && res.status < 300) {
                dispatch({
                    type: 'REMOVE_RECEIPT',
                    receipt: receipt
                });
            }
        });
    };
}
