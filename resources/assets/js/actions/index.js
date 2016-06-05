var $ = require('jquery');
import fetch from 'isomorphic-fetch'
import { reset } from 'redux-form'
import { push } from 'react-router-redux'

function getApiUrl(id) {
    return "/api/plan/" + id; 
}

function getAuthToken() {
    return 'Bearer ' + $('meta[name="data-token"]').attr('content');
}

function checkStatus(result) {
    if (result.status >= 200 && res.status < 300) {
        return result;
    } else {
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
    }

}

export function fetchReceipts(planId, year, month) {
    let url = getApiUrl(planId);
    if (year && month) {
        url = url + `/y/${year}/m/${month}`
    }
    return dispatch => {
        fetch(url)
        .then(result => result.json())
        .then(result => dispatch({
                type: 'UPDATE_RECEIPTS',
                receipts: result.receipts,
                planData: result.planData
            })
        )
        .then(result => {
            if (!year && !month) {
                const { year, month } = result.planData;
                dispatch(push(`/plan/${planId}/y/${year}/m/${month}`))
            }
            dispatch({
                type: 'CHANGE_MONTH',
                year: year,
                month: month,
            });            
        });
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
        .then(result => result.json())
        .then(result => {
            dispatch({
                type: 'UPDATE_RECEIPTS',
                receipts: result.receipts,
                planData: result.planData
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
