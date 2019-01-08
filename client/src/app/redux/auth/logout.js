import userLogout from "../actions/userLogout";
import api from "../../api/api.js";

// export const login = credentials => {
//     return dispatch => {
//         return api.user
//             .login(credentials)
//             .then(user => dispatch(userLoggedIn(user)));
//     };
// };
// can also be written as

export const logout = () => dispatch => {
        localStorage.removeItem('userJWToken'); 
        dispatch(userLogout());
    };