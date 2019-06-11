import React, { Component } from 'react'
import { Row, Col, Form,Button,ButtonToolbar } from 'react-bootstrap';
import { Link } from "react-router-dom";
import validate from "../components/Form/Validator"
import InputText from '../components/Form/InputText';

export class Register extends Component {

    state = {
        name : {
            value : '',
            rules : {
                isRequired : true,
            },
            isTouched : false
        },
        lastname : {
            value : '',
            rules : {
                isRequired : true,
            },
            isTouched : false
        },
        email : {
            value : '',
            rules : {
                isRequired : true,
                isEmail: true
            },
            isTouched : false
        },
        dedication : {
            value : '',
            rules : {
                isRequired : true,
            },
            isTouched : false
        },
        city : {
            value : '',
            rules : {
                isRequired : true,
            },
            isTouched : false
        },
        country : {
            value : '',
            rules : {
                isRequired : true,
            },
            isTouched : false
        },
        birthday : {
            value : '',
            rules : {
                isRequired : true,
            },
            isTouched : false
        },
        password : {
            value : '',
            rules : {
                isRequired : true,
                minLength : 5
            },
            isTouched : false
        },
        passwordConfirm : {
            value : '',
            rules : {
                isRequired : true,
            },
            isTouched : false
        }
        
    }

    handleChange = (event) => {
        let { name,value } = event.target;
        let controls = this.state[name];
        controls.isValid = validate(value, controls.rules);
        controls.value = value;
        controls.isTouched = true;

        if(name === 'passwordConfirm'){
            if(value !== this.state.password.value){
                controls.isValid = false;
            }
        }

        this.setState({ [name] : controls});
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
                    <Form noValidate  onSubmit={ this.handleSubmit }>
                        <Form.Group controlId="formGroupName">
                            <Form.Label>Name</Form.Label>
                            <InputText 
                                name="name"
                                onChange={ this.handleChange }
                                placeholder="Jose" 
                                type="text" 
                                isTouched = {this.state.name.isTouched}
                                isValid = {this.state.name.isValid} />
                        </Form.Group>
                        <Form.Group controlId="formGroupLastName">
                            <Form.Label>LastName</Form.Label>
                            <InputText 
                                name="lastname" 
                                onChange={ this.handleChange }
                                placeholder="Mata"
                                type="text" 
                                isTouched = {this.state.lastname.isTouched}
                                isValid = {this.state.lastname.isValid} />
                        </Form.Group>
                        <Form.Group controlId="formGroupEmail">
                            <Form.Label>Email</Form.Label>
                            <InputText 
                                name="email" 
                                onChange={ this.handleChange }
                                placeholder="name@domain.prx"
                                type="email" 
                                isTouched = {this.state.email.isTouched}
                                isValid = {this.state.email.isValid} />
                        </Form.Group>
                        <Form.Group controlId="formGroupDedication">
                            <Form.Label>Dedication</Form.Label>
                            <InputText 
                                name="dedication" 
                                onChange={ this.handleChange }
                                placeholder="teacher"
                                type="text" 
                                isTouched = {this.state.dedication.isTouched}
                                isValid = {this.state.dedication.isValid} />
                        </Form.Group>
                        <Form.Group controlId="formGroupCity">
                            <Form.Label>City</Form.Label>
                            <InputText 
                                name="city" 
                                onChange={ this.handleChange }
                                placeholder="Caracas"
                                type="text" 
                                isTouched = {this.state.city.isTouched}
                                isValid = {this.state.city.isValid} />
                        </Form.Group>
                        <Form.Group controlId="formGroupCountry">
                            <Form.Label>Country</Form.Label>
                            <InputText 
                                name="country" 
                                onChange={ this.handleChange }
                                placeholder="Venezuela"
                                type="text" 
                                isTouched = {this.state.country.isTouched}
                                isValid = {this.state.country.isValid} />
                        </Form.Group>
                        <Form.Group controlId="formGroupBirthday">
                            <Form.Label>Birthday</Form.Label>
                            <InputText 
                                name="birthday" 
                                onChange={ this.handleChange }
                                placeholder="1989-07-25"
                                type="text" 
                                isTouched = {this.state.birthday.isTouched}
                                isValid = {this.state.birthday.isValid} />
                        </Form.Group>
                        <Form.Group controlId="formGroupPassword">
                            <Form.Label>Password</Form.Label>
                            <InputText 
                                name="password" 
                                onChange={ this.handleChange }
                                placeholder="Password"
                                type="password" 
                                isTouched = {this.state.password.isTouched}
                                isValid = {this.state.password.isValid} />

                        </Form.Group>
                        <Form.Group controlId="formGroupConfirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <InputText 
                                name="passwordConfirm" 
                                onChange={ this.handleChange }
                                placeholder="Confirm Password"
                                type="password" 
                                isTouched = {this.state.passwordConfirm.isTouched}
                                isValid = {this.state.passwordConfirm.isValid} />
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