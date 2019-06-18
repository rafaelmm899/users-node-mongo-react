import React, { Component } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Message } from "../components/Message";
import { Redirect, Link } from "react-router-dom";
import { userService } from "../service/UserService";

export class Login extends Component {
    constructor() {
        super();

        userService.logout();

        this.state = {
            email: "",
            password: "",
            alert: {
                type: null,
                message: null
            },
            isAuthenticated: false
        };
    }

    handleInputOnChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { email, password } = this.state;
        userService.login(email, password).then(response => {
            if (response.user) {
                this.setState({
                    isAuthenticated: true
                });
            }
        });
    };

    render() {
        if (userService.isAuthenticated()) {
            return <Redirect to="/dashboard" />;
        }

        return (
            <Row
                className="justify-content-md-center"
                style={{ marginTop: "10%" }}
            >
                <Col md="6" className="shadow-sm p-3 mb-5 bg-light rounded">
                    <Form onSubmit={this.handleSubmit}>
                        <Message props={this.state.alert} />
                        <Row style={{ textAlign: "center" }}>
                            <Col md={{ span: 12 }}>
                                <h2>Login</h2>
                            </Col>
                        </Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    name="email"
                                    type="email"
                                    placeholder="Enter email"
                                    onChange={this.handleInputOnChange}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    onChange={this.handleInputOnChange}
                                />
                            </Form.Group>
                        </Form.Row>

                        <Form.Group as={Row}>
                            <Col md={{ span: 12 }}>
                                <Button type="submit" variant="primary">
                                    Sign in
                                </Button>
                                <Link
                                    to="/register"
                                    variant="secondary"
                                    style={{ marginLeft: ".5em" }}
                                >
                                    Register
                                </Link>
                            </Col>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        );
    }
}
