import {USER_LOGGED_IN} from "../dispatchTypes/types.js";

var userLoggedIn = function(user) {
    return {
        type: USER_LOGGED_IN,
        payload: user
    };
}

module.exports = userLoggedIn;