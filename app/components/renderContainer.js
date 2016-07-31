import React from "react";
import Container from "./Container";
import ReactDOM from "react-dom";
import reducer from "../reducers/index";
import {compose, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';

const renderContainer = () => {
    ReactDOM.render(
        <Provider store={store}>
            <Container />
        </Provider>,
        document.getElementById('container')
    );
}

const finalCreateStore = compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

const store = finalCreateStore(reducer);
window.store = store;
export {renderContainer};
