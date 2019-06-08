import React, { Component } from 'react'
import { Row, Col, Form,Button,ButtonToolbar } from 'react-bootstrap';
import { Link } from "react-router-dom";

export class Register extends Component {

    handleChange = (event) => {
        let { name,value } = event.target;
        this.setState({ [name] : value});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
    }

    render(){
        return (
            <Row className="justify-content-md-center" style={{ marginTop:"10%"}}>
                <Col md="6" className="shadow-sm p-3 mb-5 bg-light rounded">
                    <h1>User register</h1>
                    <Form onSubmit={ this.handleSubmit }>
                        <Form.Group controlId="formGroupName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control name="name" type="text" placeholder="Jose" onChange={ this.handleChange } />
                        </Form.Group>
                        <Form.Group controlId="formGroupLastName">
                            <Form.Label>LastName</Form.Label>
                            <Form.Control name="lastname" type="text" placeholder="Mata" onChange={ this.handleChange } />
                        </Form.Group>
                        <Form.Group controlId="formGroupEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control name="email" type="email" placeholder="name@domain.prx" onChange={ this.handleChange } />
                        </Form.Group>
                        <Form.Group controlId="formGroupDedication">
                            <Form.Label>Dedication</Form.Label>
                            <Form.Control name="dedication" type="text" placeholder="teacher" onChange={ this.handleChange } />
                        </Form.Group>
                        <Form.Group controlId="formGroupCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control name="city" type="text" placeholder="Caracas" onChange={ this.handleChange } />
                        </Form.Group>
                        <Form.Group controlId="formGroupCountry">
                            <Form.Label>Country</Form.Label>
                            <Form.Control name="country" type="text" placeholder="Venezuela" onChange={ this.handleChange } />
                        </Form.Group>
                        <Form.Group controlId="formGroupBirthday">
                            <Form.Label>Birthday</Form.Label>
                            <Form.Control name="birthday" type="text" placeholder="1989-07-25" onChange={ this.handleChange } />
                        </Form.Group>
                        <Form.Group controlId="formGroupPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control name="password" type="password" placeholder="" onChange={ this.handleChange } />
                        </Form.Group>
                        <Form.Group controlId="formGroupConfirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control name="passwordConfirmation" type="password" placeholder="" onChange={ this.handleChange } />
                        </Form.Group>
                        <ButtonToolbar style={{ justifyContent:'center' }}>  
                            <Button type="submit" variant="primary" size="lg" >
                                Save
                            </Button>
                            <Link to="/" className="btn btn-secondary btn-lg" size="lg" style={{marginLeft: ".5em"}}>
                                Cancel
                            </Link>
                        </ButtonToolbar>
                    </Form>
                </Col>
            </Row>
        )
    }
}