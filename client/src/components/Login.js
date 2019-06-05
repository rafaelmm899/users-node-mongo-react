import  React,{ Component } from "react";
import { Row, Col, Form,Button, ButtonToolbar } from 'react-bootstrap';

export class Login extends Component{
    render(){
        return(
            <Row className="justify-content-md-center" style={{ marginTop:"10%"}}>
                <Col md="6" className="shadow-sm p-3 mb-5 bg-light rounded">
                    <Form>
                        <Row style={{textAlign:"center"}}>
                            <Col md={{ span: 12 }}>
                                <h2>Login</h2>
                            </Col>
                        </Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                        </Form.Row>
                        
                        <Form.Group as={Row}>
                            <Col md={{ span: 12 }}>
                                <Button type="button" variant="primary">Sign in</Button>
                                <Button type="button" variant="secondary" style={{marginLeft: ".5em"}}>Register</Button>
                            </Col>
                        </Form.Group>
                        
                    </Form>
                </Col>
            </Row>
        );
    }
}