import { combineReducers } from 'redux';
import { ActionEnum } from '../actions';

const userInitialState = {
    isLogged : false
};

const user = (state = userInitialState, action) => {
    switch (action.type) {
        case ActionEnum.LOG_IN:
        case ActionEnum.LOG_OUT:
            return action.contents;
        default:
            return state;
    }
};

const loading = (state = false, action) => {
    switch (action.type) {
        case ActionEnum.LOADING_SHOW:
        case ActionEnum.LOADING_HIDE:
            return action.contents;
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    user,
    loading
});

export default rootReducer;