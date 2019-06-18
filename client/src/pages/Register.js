import React, { Component } from "react";
import { Row, Col, Form, Button, ButtonToolbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import validate from "../components/Form/Validator";
import { InputText } from "../components/Form/InputText";
import { Message } from "../components/Message";

export class Register extends Component {
    state = {
        alert: {
            type: null,
            message: null
        },
        fields: {
            name: {
                value: "",
                rules: {
                    isRequired: true
                },
                isTouched: false,
                label: "Name",
                controlId: "formGroupName"
            },
            lastname: {
                value: "",
                rules: {
                    isRequired: true
                },
                isTouched: false,
                label: "LastName",
                controlId: "formGroupLastName"
            },
            email: {
                value: "",
                rules: {
                    isRequired: true,
                    isEmail: true
                },
                isTouched: false,
                label: "Email",
                controlId: "formGroupEmail"
            },
            dedication: {
                value: "",
                rules: {
                    isRequired: true
                },
                isTouched: false,
                label: "Dedication",
                controlId: "formGroupDedication"
            },
            city: {
                value: "",
                rules: {
                    isRequired: true
                },
                isTouched: false,
                label: "City",
                controlId: "formGroupCity"
            },
            country: {
                value: "",
                rules: {
                    isRequired: true
                },
                isTouched: false,
                label: "Country",
                controlId: "formGroupCountry"
            },
            birthdate: {
                value: "",
                rules: {
                    isRequired: true,
                    isDate: true
                },
                isTouched: false,
                label: "Birthdate",
                controlId: "formGroupBirthdatebirthdate"
            },
            password: {
                value: "",
                rules: {
                    isRequired: true,
                    minLength: 5
                },
                isTouched: false,
                label: "Password",
                controlId: "formGroupPassword"
            },
            passwordConfirm: {
                value: "",
                rules: {
                    isRequired: true
                },
                isTouched: false,
                label: "Password Confirmation",
                controlId: "formGroupPasswordConfirm"
            }
        }
    };

    handleChange = event => {
        let { name, value } = event.target;
        let controls = this.state.fields[name];
        controls.isValid = validate(value, controls.rules);
        controls.value = value;
        controls.isTouched = true;
        this.setState({ [name]: controls });
    };

    /**
     *  Valida que todos los campos del formulario y
     *  retorna los campos correctos
     */
    formValidation = () => {
        var params = {
                fields: {},
                alert: { type: "", message: "" },
                formValidated: false
            },
            { password, passwordConfirm } = this.state.fields;

        for (let field in this.state.fields) {
            let controls = this.state.fields[field];
            controls.isValid = validate(
                this.state.fields[field].value,
                this.state.fields[field].rules
            );
            if (controls.isValid) {
                params[field] = controls.value;
            } else {
                params.formValidated = true;
            }
            params.fields[field] = controls;
        }

        if (!params.formValidated && password !== passwordConfirm) {
            params.formValidated = true;
            params.fields.password.isValid = false;
            params.fields.passwordConfirm.isValid = false;
            params.alert = {
                type: "danger",
                message: "The passwords are different"
            };
        }

        this.setState({
            formValidation: params.formValidated,
            alert: params.alert,
            fields: params.fields
        });

        return !params.formValidated ? params : false;
    };

    sendFormRegistration = params => {
        fetch("http://localhost:3789/api/user-create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params)
        })
            .then(res => res.json())
            .catch(error => console.log("error", error))
            .then(response => {
                if (!response.user) {
                    this.setState({
                        alert: {
                            type: "danger",
                            message: response.message
                        }
                    });
                } else {
                    this.setState({
                        alert: {
                            type: "success",
                            message: "successfully registered user"
                        }
                    });
                }
            });
    };

    handleSubmit = e => {
        e.preventDefault();
        let params = this.formValidation();
        if (params) {
            this.sendFormRegistration(params);
        }
    };

    render() {
        return (
            <Row
                className="justify-content-md-center"
                style={{ marginTop: "10%" }}
            >
                <Col md="6" className="shadow-sm p-3 mb-5 bg-light rounded">
                    <h1>User register</h1>
                    <Form
                        validated={this.state.formValidation}
                        onSubmit={this.handleSubmit}
                    >
                        <Message props={this.state.alert} />
                        <Form.Row>
                            <InputText
                                controlId={this.state.fields.name.controlId}
                                label={this.state.fields.name.label}
                                name="name"
                                onChange={this.handleChange}
                                placeholder="Jose"
                                type="text"
                                isTouched={this.state.fields.name.isTouched}
                                isValid={this.state.fields.name.isValid}
                            />

                            <InputText
                                controlId={this.state.fields.lastname.controlId}
                                label={this.state.fields.lastname.label}
                                name="lastname"
                                onChange={this.handleChange}
                                placeholder="Mata"
                                type="text"
                                isTouched={this.state.fields.lastname.isTouched}
                                isValid={this.state.fields.lastname.isValid}
                            />
                        </Form.Row>
                        <Form.Row>
                            <InputText
                                controlId={this.state.fields.email.controlId}
                                label={this.state.fields.email.label}
                                name="email"
                                onChange={this.handleChange}
                                placeholder="name@domain.prx"
                                type="email"
                                isTouched={this.state.fields.email.isTouched}
                                isValid={this.state.fields.email.isValid}
                            />

                            <InputText
                                controlId={
                                    this.state.fields.dedication.controlId
                                }
                                label={this.state.fields.dedication.label}
                                name="dedication"
                                onChange={this.handleChange}
                                placeholder="teacher"
                                type="text"
                                isTouched={
                                    this.state.fields.dedication.isTouched
                                }
                                isValid={this.state.fields.dedication.isValid}
                            />
                        </Form.Row>
                        <Form.Row>
                            <InputText
                                controlId={this.state.fields.city.controlId}
                                label={this.state.fields.city.label}
                                name="city"
                                onChange={this.handleChange}
                                placeholder="Caracas"
                                type="text"
                                isTouched={this.state.fields.city.isTouched}
                                isValid={this.state.fields.city.isValid}
                            />

                            <InputText
                                controlId={this.state.fields.country.controlId}
                                label={this.state.fields.country.label}
                                name="country"
                                onChange={this.handleChange}
                                placeholder="Venezuela"
                                type="text"
                                isTouched={this.state.fields.country.isTouched}
                                isValid={this.state.fields.country.isValid}
                            />

                            <InputText
                                controlId={
                                    this.state.fields.birthdate.controlId
                                }
                                label={this.state.fields.birthdate.label}
                                name="birthdate"
                                onChange={this.handleChange}
                                placeholder="1989-07-25"
                                type="text"
                                isTouched={
                                    this.state.fields.birthdate.isTouched
                                }
                                isValid={this.state.fields.birthdate.isValid}
                            />
                        </Form.Row>
                        <Form.Row>
                            <InputText
                                controlId={this.state.fields.password.controlId}
                                label={this.state.fields.password.label}
                                name="password"
                                onChange={this.handleChange}
                                placeholder="Password"
                                type="password"
                                isTouched={this.state.fields.password.isTouched}
                                isValid={this.state.fields.password.isValid}
                            />

                            <InputText
                                controlId={
                                    this.state.fields.passwordConfirm.controlId
                                }
                                label={this.state.fields.passwordConfirm.label}
                                name="passwordConfirm"
                                onChange={this.handleChange}
                                placeholder="Confirm Password"
                                type="password"
                                isTouched={
                                    this.state.fields.passwordConfirm.isTouched
                                }
                                isValid={
                                    this.state.fields.passwordConfirm.isValid
                                }
                            />
                        </Form.Row>
                        <ButtonToolbar style={{ justifyContent: "center" }}>
                            <Button type="submit" variant="primary" size="lg">
                                Save
                            </Button>
                            <Link
                                to="/login"
                                className="btn btn-secondary btn-lg"
                                size="lg"
                                style={{ marginLeft: ".5em" }}
                            >
                                Cancel
                            </Link>
                        </ButtonToolbar>
                    </Form>
                </Col>
            </Row>
        );
    }
}
