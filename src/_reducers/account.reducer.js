import { accountConstants } from '../_constants/account.constants';

export function accounts(state = {}, action) {
    switch (action.type) {
        case accountConstants.GETALL_REQUESTACC:
            return {
                loading: true
            };
        case accountConstants.GETALL_SUCCESSACC:
            return {
                items: action.users
            };
        case accountConstants.GETALL_FAILUREACC:
            return {
                error: action.error
            };
            case accountConstants.UPDATEUSER_REQUESTACC:
            return {
                loading: true
            };
        case accountConstants.UPDATEUSER_SUCCESSACC:
            return {
                items: action.user
            };
        case accountConstants.UPDATEUSER_FAILUREACC:
            return {
                error: action.error
            };
            case accountConstants.VERIFYEMAIL_REQUEST:
                return {
                    loading: true
                };
            case accountConstants.VERIFYEMAIL_SUCCESS:
                return {
                    
                };
            case accountConstants.VERIFYEMAIL_FAILURE:
                return {
                    error: action.error
                };
                case accountConstants.FORGOTPASS_REQUEST:
                    return {
                        loading: true
                    };
                case accountConstants.FORGOTPASS_SUCCESS:
                    return {
                       
                    };
                case accountConstants.FORGOTPASS_FAILURE:
                    return {
                        error: action.error
                    };
                    case accountConstants.RESETPASS_REQUEST:
                        return {
                            loading: true
                        };
                    case accountConstants.RESETPASS_SUCCESS:
                        return {
                            
                        };
                    case accountConstants.RESETPASS_FAILURE:
                        return {
                            error: action.error
                        };
            case accountConstants.GETBYID_REQUESTACC:
            return {
               
                ...state,
                items: state.items.map(user => user),
                loading: true,
            };
        case accountConstants.GETBYID_SUCCESSACC:
            return {
                items: state.items.filter(user => user.id == action.id)
            };
        case accountConstants.GETBYID_FAILUREACC:
            return {
                error: action.error
            };
        case accountConstants.DELETE_REQUESTACC:
            // add 'deleting:true' property to user being deleted
            return {
                ...state,
                items: state.items.map(user =>
                    user.id === action.id
                        ? { ...user, deleting: true }
                        : user
                )
            };
        case accountConstants.DELETE_SUCCESSACC:
            // remove deleted user from state
            return {
                items: state.items.filter(user => user.id !== action.id)
            };
        case accountConstants.DELETE_FAILUREACC:
            // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
            return {
                ...state,
                items: state.items.map(user => {
                    if (user.id === action.id) {
                        // make copy of user without 'deleting:true' property
                        const { deleting, ...userCopy } = user;
                        // return copy of user with 'deleteError:[error]' property
                        return { ...userCopy, deleteError: action.error };
                    }

                    return user;
                })
            };
        default:
            return state
    }
}