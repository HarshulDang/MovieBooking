import React from "react";
import Validator from "validator";
import { Form, Button, Message } from "semantic-ui-react";

import InlineError from "../messages/InlineError.jsx";

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                email: "",
                password: ""
            },
            loading: false,
            errors: {}
        };
    }

    onChange(event) {
        this.setState({
            data: {
                ...this.state.data,
                [event.target.name]: event.target.value
            }
        });
    }

    onSubmit() {
        const errors = this.validate(this.state.data);
        this.setState({ errors }); // ({errors: errors})
        if (Object.keys(errors).length === 0) {
            this.setState({ loading: true });
            this.props.submit(this.state.data).catch(err => {
                // console.log(err.response.data);

                this.setState({
                    errors: err.response.data,
                    loading: false
                });
            });
        }
    }

    validate(data) {
        const errors = {};
        if (!Validator.isEmail(data.email)) errors.email = "INVALID EMAIL!!";
        if (!data.password) errors.password = "Can't be Blank!!";
        return errors;
    }

    render() {
        return (
            <Form onSubmit={() => this.onSubmit()} loading={this.state.loading}>
                {this.state.errors.message && (
                    <Message negative>
                        <Message.Header>"Something FISHY!!"</Message.Header>
                        <p>{this.state.errors.message}</p>
                    </Message>
                )}
                <Form.Field>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="example@example.com"
                        value={this.state.data.email}
                        onChange={event => this.onChange(event)}
                    />
                    {this.state.errors.email && (
                        <InlineError text={this.state.errors.email} />
                    )}
                </Form.Field>
                <Form.Field>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Secure Your Data"
                        value={this.state.data.password}
                        onChange={event => this.onChange(event)}
                    />
                    {this.state.errors.password && (
                        <InlineError text={this.state.errors.password} />
                    )}
                </Form.Field>
                <Button primary>Login</Button>
            </Form>
        );
    }
}

module.exports = LoginForm;
