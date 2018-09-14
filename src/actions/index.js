import ActionEnum from './ActionEnum';
import * as Util from "../common/Util";
const BASE_URL = "http://localhost:3000/";

export {
    ActionEnum
};

export const login = (user={}) => {
    return {
        type        : ActionEnum.LOG_IN,
        contents    : Object.assign({}, user, {isLogged : true})
    };
};

export const logout = () => {
    return {
        type        : ActionEnum.LOG_OUT,
        contents    : {isLogged : false}
    };
};

export const showLoading = () => {
    return {
        type        : ActionEnum.LOADING_SHOW,
        contents    : true
    };
};

export const hideLoading = () => {
    return {
        type        : ActionEnum.LOADING_HIDE,
        contents    : false
    };
};

export const fetchGetArticles = (dispatch, getState) => {
    fetch(BASE_URL + 'articles', {
        method: 'GET',
        headers: {
            'Accept': 'application/json; charset=utf-8',
            'Content-Type': 'application/json; charset=utf-8',
        },
        mode : 'cors'
    })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
            console.log(responseJson.result);
            dispatch(login());
        })
        .catch(err=>{console.log(err); dispatch(hideLoading);});

};
