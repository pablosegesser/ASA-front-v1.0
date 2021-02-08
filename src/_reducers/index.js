import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { campeonatos } from './campeonatos.reducer';
import {accounts} from './account.reducer';
import {authenticationAccount} from './authenticationAccount.reducer';
import {registrationAccount} from './registrationAccount.reducer';

const rootReducer = combineReducers({
    authentication,
    registration,
    users,
    alert,
    campeonatos,
    accounts,
    authenticationAccount,
    registrationAccount
});

export default rootReducer;