var $ = require('jquery');
import fetch from 'isomorphic-fetch'
import { reset } from 'redux-form'

function getApiUrl(id) {
    return "/api/plan/" + id; 
}

function getAuthToken() {
    return 'Bearer ' + $('meta[name="data-token"]').attr('content');
}

function checkStatus(res) {
    if (res.status >= 200 && res.status < 300) {
        return res;
    } else {
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
    }

}

export function fetchReceipts(planId, month) {
    return dispatch => {
        fetch(getApiUrl(planId) + '/y/2016/m/5')
        .then(result => result.json())
        .then(result => dispatch({
            type: 'UPDATE_RECEIPTS',
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
        .then(checkStatus)
        .then(res => res.json())
        .then(res => {
            dispatch({
                type: 'UPDATE_RECEIPTS',
                receipts: res.receipts
            });
            dispatch(reset('addReceiptForm'));
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
        .then(checkStatus)
        .then(res => {
            dispatch({
                type: 'REMOVE_RECEIPT',
                receipt: receipt
            });
        });
    };
}
