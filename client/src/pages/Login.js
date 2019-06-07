import  React,{ Component } from "react";
import { Row, Col, Form,Button } from 'react-bootstrap';
import { Message } from '../components/Message'
import { Redirect } from "react-router-dom";
import { isAuthenticated } from '../components/Authentication';

export class Login extends Component{

    state = {
        email : '',
        password : '',
        alert : {
            type : null,
            message : null
        },
        isAuthenticated : false
    }

   

    handleInputOnChange = (e) => { 
        this.setState({ [ e.target.name ] : e.target.value })
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        const { email, password } = this.state;
        fetch('http://localhost:3789/api/login',{ 
            method : 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({ email , password })
        }).then(res => res.json())
            .catch(error => console.log('error', error))
            .then(response => {
                if(response.user){
                    localStorage.setItem('user', JSON.stringify(response.user));
                    localStorage.setItem('token',response.token);
                    this.setState({
                        isAuthenticated : true
                    })
                }else{
                    this.setState({
                        alert : {
                            type : 'danger',
                            message : response.message
                        }
                    })
                }   
            });
    }


    render(){
        if (isAuthenticated()) {
            return <Redirect to="/dashboard" />;
        }

        return(
            <Row className="justify-content-md-center" style={{ marginTop:"10%"}}>
                <Col md="6" className="shadow-sm p-3 mb-5 bg-light rounded">
                    <Form onSubmit={ this.handleSubmit }>
                        <Message props={ this.state.alert } />
                        <Row style={{textAlign:"center"}}>
                            <Col md={{ span: 12 }}>
                                <h2>Login</h2>
                            </Col>
                        </Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control name="email" type="email" placeholder="Enter email" onChange={ this.handleInputOnChange } />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control name="password" type="password" placeholder="Password" onChange={ this.handleInputOnChange } />
                            </Form.Group>
                        </Form.Row>
                        
                        <Form.Group as={Row}>
                            <Col md={{ span: 12 }}>
                                <Button type="submit" variant="primary">Sign in</Button>
                                <Button type="button" variant="secondary" style={{marginLeft: ".5em"}}>Register</Button>
                            </Col>
                        </Form.Group>
                        
                    </Form>
                </Col>
            </Row>
        );
    }
}