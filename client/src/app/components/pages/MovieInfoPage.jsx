import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { List, Button, Message } from "semantic-ui-react";

import Review from "../Review.jsx";
import api from "../../api/api.js";

class MovieInfoPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            MovieReviews: []
        };
    }

    componentWillMount() {
        api.user.review(this.props.movieData.Title).then(MovieReviews => {
            this.setState({ MovieReviews });
        });
    }

    componentWillReceiveProps(nextProps) {
        api.user.review(nextProps.movieData.Title).then(MovieReviews => {
            this.setState({ MovieReviews });
        });
    }

    render() {
        return (
            <div>
                <h1>Movie Info Page</h1>
                <Message info>
                    <Message.Header>
                        {" "}
                        {this.props.movieData.Title}{" "}
                    </Message.Header>
                    {Object.keys(this.props.movieData).map((record, i) => {
                        return (
                            <li key={i}>
                                <p>
                                    {record +
                                        ":" +
                                        this.props.movieData[record]}
                                </p>
                            </li>
                        );
                    })}
                    <Review
                        Title={this.props.movieData.Title}
                        MovieReviews={this.state.MovieReviews}
                    />
                </Message>
                <Link to={"/" + this.props.movieData.Title + "/book"}>
                    <Button primary>BOOK MOVIE</Button>
                </Link>
                <br />
                <br />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        movieData: state.movie
    };
}

export default connect(mapStateToProps)(MovieInfoPage);
