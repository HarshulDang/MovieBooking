import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Message } from "semantic-ui-react";
import { logout } from "../../redux/auth/logout";

const HomePage = props => {
    return (
        <div>
            <Message info>
                <Message.Header>
                    <h1>MOVIE BOOKING HOME PAGE</h1>
                </Message.Header>
            </Message>

            {props.isAuthenticated ? (
                <Button primary onClick={props.logout}>
                    Logout
                </Button>
            ) : (
                <div>
                    <Link to="/login">
                        <Button secondary>LOGIN</Button>
                    </Link>{" "}
                    OR{" "}
                    <Link to="/signup">
                        <Button secondary>SIGN UP</Button>
                    </Link>
                </div>
            )}
        </div>
    );
};

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.user.token
    };
}

export default connect(mapStateToProps, { logout })(HomePage);
