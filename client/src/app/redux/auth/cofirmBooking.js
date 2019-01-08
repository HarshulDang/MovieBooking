import userLoggedIn from "../actions/userLoggedIn.js";
import api from "../../api/api.js";

export const confirmBooking = bookingData => dispatch =>
    api.user.confirmBooking(bookingData).then(new_user_data => {
        dispatch(userLoggedIn(new_user_data));
    });
