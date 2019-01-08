import userLoggedIn from "../actions/userLoggedIn.js";
import api from "../../api/api.js";

// export const login = credentials => {
//     return dispatch => {
//         return api.user
//             .login(credentials)
//             .then(user => dispatch(userLoggedIn(user)));
//     };
// };
// can also be written as

export const login = credentials => dispatch =>
    api.user.login(credentials).then(user => {
        localStorage.userJWToken = user.token;
        dispatch(userLoggedIn(user));
        return user;
    });
