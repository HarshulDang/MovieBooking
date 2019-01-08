import setTheatrePreference from "../actions/setTheatrePreference";

const theatrePreference = theatreData => dispatch => {
    dispatch(setTheatrePreference(theatreData));
};

module.exports = theatrePreference;
