import { MOVIE_INFO } from "../dispatchTypes/types.js";

var info = function(movieData) {
    return {
        type: MOVIE_INFO,
        payload: movieData
    };
};

module.exports = info;
