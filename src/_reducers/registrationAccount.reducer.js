import { accountConstants } from '../_constants';

export function registrationAccount(state = {}, action) {
    switch (action.type) {
        case accountConstants.REGISTER_REQUESTACC:
            return { registering: true };
        case accountConstants.REGISTER_SUCCESSACC:
            return {};
        case accountConstants.REGISTER_FAILUREACC:
            return {};
        default:
            return state
    }
}