import { accountConstants } from '../_constants/account.constants';
import { accountService } from '../_services/account.service';
import { alertActions } from '../_actions/alert.actions';
import { history } from '../_helpers';

export const accountActions = {
    login,
    logout,
    register,
    getAll,
    delete: _delete,
    get_by_id,
    update_user,
    verifyEmail,
    forgotPassword,
    resetPassword
};

function verifyEmail(user){

    return dispatch => {
        dispatch(request(user));
        
        accountService.verifyEmail(user)
            .then(
                user => {
                    dispatch(success(user));
                    dispatch(alertActions.success('Verification successful, you can now login'));
                    history.push('/login');
                
                },
                error => dispatch(failure(error.toString()))
            );
    };
    function request(user) { return { type: accountConstants.VERIFYEMAIL_REQUEST, payload: user} }
    function success(user) { return { type: accountConstants.VERIFYEMAIL_SUCCESS, payload: user} }
    function failure(error) { return { type: accountConstants.VERIFYEMAIL_FAILURE, error } }


}

function forgotPassword(user){

    return dispatch => {
        dispatch(request(user));
        
        accountService.forgotPassword(user)
            .then(
                user => {dispatch(success(user))
                   dispatch(alertActions.success('Please check your email for password reset instructions'));
                },
                error => dispatch(failure(error.toString()))
            );
    };
    function request(user) { return { type: accountConstants.FORGOTPASS_REQUEST, payload: user} }
    function success(user) { return { type: accountConstants.FORGOTPASS_SUCCESS, payload: user} }
    function failure(error) { return { type: accountConstants.FORGOTPASS_FAILURE, error } }


}

function resetPassword(user){

    return dispatch => {
        dispatch(request(user));
        
        accountService.resetPassword(user)
            .then(
                user => {dispatch(success(user))
                    dispatch(alertActions.success('Password reset successful, you can now login'));
                    history.push('/login');
                },
                error => dispatch(failure(error.toString()))
            );
    };
    function request(user) { return { type: accountConstants.RESETPASS_REQUEST, payload: user} }
    function success(user) { return { type: accountConstants.RESETPASS_SUCCESS, payload: user} }
    function failure(error) { return { type: accountConstants.RESETPASS_FAILURE, error } }


}




function update_user(id,user){

    return dispatch => {
        dispatch(request(id,user));
        
        accountService.update(id,user)
            .then(
                user => {dispatch(success(id,user)),
                dispatch(alertActions.success('User updated successfully'))
                },
                error => dispatch(failure(error.toString()))
            );
    };
    function request(id,user) { return { type: accountConstants.UPDATEUSER_REQUESTACC, id,user} }
    function success(id,user) { return { type: accountConstants.UPDATEUSER_SUCCESSACC,id,user} }
    function failure(error) { return { type: accountConstants.UPDATEUSER_FAILUREACC, error } }


}

function get_by_id(id){
    return dispatch => {
        dispatch(request(id));

        accountService.getById(id)
            .then(
                users => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: accountConstants.GETBYID_REQUESTACC, id } }
    function success(id) { return { type: accountConstants.GETBYID_SUCCESSACC, id} }
    function failure(id, error) { return { type: accountConstants.GETBYID_FAILUREACC, id, error } }

}


function login(email, password, from) {
    return dispatch => {
        dispatch(request());

        accountService.login(email, password)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push(from);
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: accountConstants.LOGIN_REQUESTACC } }
    function success(user) { return { type: accountConstants.LOGIN_SUCCESSACC, user } }
    function failure(error) { return { type: accountConstants.LOGIN_FAILUREACC, error } }
}

function logout() {
    accountService.logout();
    return { type: accountConstants.LOGOUTACC };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        accountService.register(user)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push('/login');
                    dispatch(alertActions.success('Registration successful please check your email for confirmation Link'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: accountConstants.REGISTER_REQUESTACC, user } }
    function success(user) { return { type: accountConstants.REGISTER_SUCCESSACC, user } }
    function failure(error) { return { type: accountConstants.REGISTER_FAILUREACC, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        accountService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: accountConstants.GETALL_REQUESTACC } }
    function success(users) { return { type: accountConstants.GETALL_SUCCESSACC, users } }
    function failure(error) { return { type: accountConstants.GETALL_FAILUREACC, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        accountService.delete(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: accountConstants.DELETE_REQUESTACC, id } }
    function success(id) { return { type: accountConstants.DELETE_SUCCESSACC, id } }
    function failure(id, error) { return { type: accountConstants.DELETE_FAILUREACC, id, error } }
}