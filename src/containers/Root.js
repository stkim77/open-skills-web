import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '../config';
import { App } from './index';

const store = configureStore();

class Root extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <App/>
            </Provider>
        );
    }
}

export default Root;