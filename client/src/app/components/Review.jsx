import React from "react";
import { Message } from "semantic-ui-react";
import api from "../api/api.js";

class Review extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.MovieReviews.length > 0 && (
                    <Message info>
                        <Message.Header>
                            {" "}
                            {this.props.Title} Reviews{" "}
                        </Message.Header>
                        {this.props.MovieReviews.map((record, i) => {
                            return (
                                <li key={i}>
                                    {Object.keys(record).map(field => {
                                        return (
                                            <p key={record[field]}>
                                                {field + ":" + record[field]}
                                            </p>
                                        );
                                    })}
                                </li>
                            );
                        })}
                    </Message>
                )}
            </div>
        );
    }
}

export default Review;
