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
    if (result.status >= 200 && result.status < 300) {
        return result;
    } else {
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
    }

}

function getCurrentMonth() {
    return new Date().getMonth() + 1;
}

function getCurrentYear() {
    return new Date().getFullYear();
}

export function fetchReceipts(planId, year = null, month = null) {
    let url = getApiUrl(planId);
    var pushDateToUrl = false;
    if (!year || !month) {
        pushDateToUrl = true;
    }
    if (!year) {
        year = getCurrentYear();
    }

    if (!month) {
        month = getCurrentMonth();
    }

    url = url + `/y/${year}/m/${month}`

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
            const { year, month } = result.planData;
            if (pushDateToUrl) {
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
        .then(result => result.json())
        .then(result => {
            dispatch({
                type: 'REMOVE_RECEIPT',
                receipt: receipt
            });
        });
    };
}
