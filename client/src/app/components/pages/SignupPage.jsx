import React from "react";
import { connect } from "react-redux";
import SignupForm from "../forms/SignupForm.jsx";
import { signup } from "../../redux/auth/signup.js";
import { confirmBooking } from "../../redux/auth/cofirmBooking.js";

class SignupPage extends React.Component {
    submit(data) {
        if (this.props.isTheatrePrefAvailable) {
            return this.props.signup(data).then(user => {
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
            return this.props.signup(data).then(() => {
                this.props.history.push("/dashboard");
            });
    }

    render() {
        return (
            <div>
                <h1>Sign Up Page</h1>
                <SignupForm submit={this.submit.bind(this)} />
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

export default connect(mapStateToProps, { signup, confirmBooking })(SignupPage);
