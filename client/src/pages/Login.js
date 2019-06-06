import  React,{ Component } from "react";
import { Row, Col, Form,Button } from 'react-bootstrap';
import { Message } from '../components/message'

export class Login extends Component{

    state = {
        email : '',
        password : '',
        alert : {
            type : null,
            message : null
        },
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        fetch('http://localhost:3789/api/login',{ 
            method : 'POST',
            body : JSON.stringify(this.state)
        }).then(res => res.json())
            .catch(error => console.log('error', error))
            .then(response => {
                if(response.user){
                    
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
                                <Form.Control type="email" placeholder="Enter email" onChange = { (e) => { this.setState({ email : e.target.value }) }} />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange = { (e) => { this.setState({ password : e.target.value }) }} />
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