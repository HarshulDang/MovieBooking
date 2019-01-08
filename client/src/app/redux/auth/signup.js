import userSignedUp from "../actions/userSignedUp.js";
import api from "../../api/api.js";

// export const login = credentials => {
//     return dispatch => {
//         return api.user
//             .login(credentials)
//             .then(user => dispatch(userLoggedIn(user)));
//     };
// };
// can also be written as

export const signup = credentials => dispatch =>
    api.user.signup(credentials).then(user => {
        localStorage.userJWToken = user.token;
        dispatch(userSignedUp(user));
        return user;
    });
