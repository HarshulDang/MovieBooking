import { SET_THEATRE_PREFERENCE } from "../dispatchTypes/types";

const setTheatrePreference = thretreData => {
    return {
        type: SET_THEATRE_PREFERENCE,
        payload: thretreData
    };
};

module.exports = setTheatrePreference;
