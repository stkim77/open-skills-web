import * as R from 'ramda';

export const setUserInfo = (user) => {
    sessionStorage.setItem('user', JSON.stringify(user));
};
export const getUserInfo = () => {
    const rtn = sessionStorage.getItem('user');
    if (R.isNil(rtn) || R.isEmpty(rtn)) {
        return {};
    } else {
        return JSON.parse(rtn);
    }
};

export const setArticleInfo = (id,data) => {
    sessionStorage.setItem(id, JSON.stringify(data));
};
export const getArticleInfo = (id) => {
    const rtn = sessionStorage.getItem(id);
    if (R.isNil(rtn) || R.isEmpty(rtn)) {
        return {};
    } else {
        return JSON.parse(rtn);
    }
};