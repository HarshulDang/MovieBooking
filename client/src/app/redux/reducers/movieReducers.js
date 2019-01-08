import { MOVIE_INFO, SET_THEATRE_PREFERENCE } from "../dispatchTypes/types.js";

const movieReducer = (state = {}, action = {}) => {
    switch (action.type) {
        case MOVIE_INFO:
            return action.payload;
        case SET_THEATRE_PREFERENCE:
            state["userTheatrePref"] = action.payload;
            return state;
        default:
            return state;
    }
};
export default movieReducer;
