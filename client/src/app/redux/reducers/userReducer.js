import {
    USER_LOGGED_IN,
    USER_LOGGED_OUT,
    USER_SIGNED_UP
} from "../dispatchTypes/types.js";

const userReducer = (state = {}, action = {}) => {
    switch (action.type) {
        case USER_LOGGED_IN:
            return action.payload;
        case USER_SIGNED_UP:
            return action.payload;
        case USER_LOGGED_OUT:
            return {};
        default:
            return state;
    }
};
export default userReducer;
