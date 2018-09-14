import * as R from 'ramda';
export const getUserInfo = () => {
    const rtn = sessionStorage.getItem('user');
    if (R.isNil(rtn) || R.isEmpty(rtn)) {
        return false;
    } else {
        return true;
    }
};
export const setUserInfo = (user) => {
    sessionStorage.setItem('user', user);
};