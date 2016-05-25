import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { syncHistory, routeReducer } from 'react-router-redux';
import { Router, hashHistory, browserHistory } from 'react-router';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';
import { receiptReducer, visibilityFilter, newReceipt } from './reducers';
import routes from './routes';

const reducer = combineReducers({
    newReceipt: newReceipt,
    routing: routeReducer,
    receipts: receiptReducer,
    form: formReducer,
    visibilityFilter: visibilityFilter
});




const reduxRouterMiddleware = syncHistory(browserHistory);
const createStoreWithMiddleware = applyMiddleware(reduxRouterMiddleware, thunk)(createStore);

const store = createStoreWithMiddleware(reducer);

reduxRouterMiddleware.listenForReplays(store)

render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
    </Provider>,
    document.getElementById('plan')
);
