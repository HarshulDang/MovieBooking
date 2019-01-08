import React from "react";
import ReactDOM from "react-dom";
import { Button, Message, Segment, Divider } from "semantic-ui-react";
import { connect } from "react-redux";

import { confirmBooking } from "../../redux/auth/cofirmBooking";
import theatrePreference from "../../redux/auth/theatrePreference";
import api from "../../api/api";

class BookingsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            AllTheatres: [],
            Title: props.match.params.movie
        };
    }

    componentWillMount() {
        api.user.theatres(this.state.Title).then(AllTheatres => {
            this.setState({ AllTheatres });
        });
    }

    handleOnClick(record) {
        if (this.props.isAuthenticated) {
            const bookingData = {
                email: this.props.user.email,
                movie: record.Movie,
                theatre: record.Name,
                showTime: record.ShowTime
            };
            this.props
                .confirmBooking(bookingData)
                .then(() => this.props.history.push("/dashboard"));
        } else {
            this.props.theatrePreference(record);
            this.props.history.push("/");
        }
    }

    render() {
        return (
            <div ref={node => (this.unmountSection = node)}>
                <h1>Theatre Info Page</h1>
                <Message info>
                    <Message.Header>
                        All Shows of {this.state.Title}{" "}
                    </Message.Header>
                    <Segment>
                        {this.state.AllTheatres.map((record, i) => {
                            return (
                                <ul key={i}>
                                    {Object.keys(record).map(v => {
                                        return (
                                            <li key={v}>
                                                {v + ":" + record[v]}
                                            </li>
                                        );
                                    })}
                                    {record["Seat"] > 0 ? (
                                        <Button
                                            primary
                                            floated="right"
                                            loading={this.state.loading}
                                            onClick={this.handleOnClick.bind(
                                                this,
                                                record
                                            )}
                                        >
                                            {this.props.isAuthenticated
                                                ? "Click to confirm Booking"
                                                : "Login/Signup"}
                                        </Button>
                                    ) : (
                                        <Button
                                            primary
                                            disabled={true}
                                            floated="right"
                                        >
                                            Sorry...HOUSEFULL
                                        </Button>
                                    )}
                                    <br />
                                    <Divider section={true} />
                                </ul>
                            );
                        })}
                    </Segment>
                </Message>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.user.token,
        user: state.user
    };
}

export default connect(mapStateToProps, { confirmBooking, theatrePreference })(
    BookingsPage
);
