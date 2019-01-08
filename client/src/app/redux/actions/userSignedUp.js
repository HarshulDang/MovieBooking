import {USER_SIGNED_UP} from "../dispatchTypes/types.js";

var userSignedUp = function(user) {
    return {
        type: USER_SIGNED_UP,
        payload: user
    };
}

module.exports = userSignedUp;