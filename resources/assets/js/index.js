import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import { Router, hashHistory, browserHistory } from 'react-router';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';
import { receiptReducer, visibilityFilter, newReceipt, planData, storesReducer, autocomplete } from './reducers';
import routes from './routes';

const reducer = combineReducers({
    newReceipt: newReceipt,
    routing: routerReducer,
    receipts: receiptReducer,
    form: formReducer,
    visibilityFilter: visibilityFilter,
    planData: planData,
    stores: storesReducer,
    autocomplete: autocomplete
});

const createStoreWithMiddleware = applyMiddleware(routerMiddleware(browserHistory), thunk)(createStore);

const store = createStoreWithMiddleware(reducer);
const history = syncHistoryWithStore(browserHistory, store);

render(
    <Provider store={store}>
        <Router history={history} routes={routes} />
    </Provider>,
    document.getElementById('plan')
);
