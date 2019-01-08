import React from "react";
import { connect } from "react-redux";
import LoginForm from "../forms/LoginForm.jsx";
import { login } from "../../redux/auth/login.js";
import { confirmBooking } from "../../redux/auth/cofirmBooking.js";

class LoginPage extends React.Component {
    submit(data) {
        if (this.props.isTheatrePrefAvailable) {
            return this.props.login(data).then(user => {
                const theatrePref = {
                    email: user.email,
                    movie: this.props.theatreRecord.Movie,
                    theatre: this.props.theatreRecord.Name,
                    showTime: this.props.theatreRecord.ShowTime
                };

                this.props
                    .confirmBooking(theatrePref)
                    .then(() => this.props.history.push("/dashboard"));
            });
        } else
            return this.props.login(data).then(() => {
                this.props.history.push("/dashboard");
            });
    }

    render() {
        return (
            <div>
                <h1>Login Page</h1>
                <LoginForm submit={this.submit.bind(this)} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isTheatrePrefAvailable: !!state.movie.userTheatrePref,
        theatreRecord: state.movie.userTheatrePref
    };
};

module.exports = connect(mapStateToProps, { login, confirmBooking })(LoginPage);
