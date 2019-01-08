import info from "../actions/info.js";

const movieInfo = data => dispatch => dispatch(info(data));

module.exports = movieInfo;
