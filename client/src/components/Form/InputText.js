import React, { Component } from 'react'
import { Form,Col } from 'react-bootstrap';

export class InputText extends Component {

    state ={
        isInValid : false
    }

    componentWillReceiveProps(nextProp){
        if(nextProp.isTouched){
            if(!nextProp.isValid){
                this.setState({
                    isInValid : true
                })
            }else{
                this.setState({
                    isInValid : false
                })
            }
        }
    }

    render(){
        const { name, onChange, type, placeholder,label,controlId } = this.props

        return  (
                <Form.Group as={Col} controlId={controlId}>
                    <Form.Label>{label}</Form.Label>
                    <Form.Control 
                        isInvalid={this.state.isInValid}
                        name={name}
                        onChange={onChange}
                        type={type}
                        placeholder={placeholder}
                        required />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid {name}.
                        </Form.Control.Feedback>
                </Form.Group>
                );
    }
}