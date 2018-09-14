import ActionEnum from './ActionEnum';

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
