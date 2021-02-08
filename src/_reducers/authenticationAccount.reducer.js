import { accountConstants } from '../_constants/account.constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export function authenticationAccount(state = initialState, action) {
    switch (action.type) {
        case  accountConstants.LOGIN_REQUESTACC:
            return {
                loggingIn: true,
                user: action.user
            };
        case  accountConstants.LOGIN_SUCCESSACC:
            return {
                loggedIn: true,
                user: action.user
            };
        case  accountConstants.LOGIN_FAILUREACC:
            return {};
        case  accountConstants.LOGOUTACC:
            return { loggedIn: false};
        default:
            return state
    }
}