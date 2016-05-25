var $ = require('jquery');
import fetch from 'isomorphic-fetch'

function getApiUrl(id) {
    return "/api/plan/" + id; 
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

    var auth = 'Bearer ' + $('meta[name="data-token"]').attr('content');
    console.log(receipt);

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
            console.log(res);
        });
    }
}

export function removeReceipt(receipt, planId) {
    console.log(receipt, planId);
}
