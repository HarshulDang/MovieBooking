import React from "react";

const InlineError = props => {
    return <span style={{ color: "red" }}>{props.text}</span>;
};

module.exports = InlineError;
