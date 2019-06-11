import React from 'react'
import { Form } from 'react-bootstrap';

const InputText = props => {


    if(props.isTouched){
        return (props.isValid) ?  
                    <Form.Control   isValid={true}
                                    name={props.name}
                                    onChange={props.onChange}
                                    type={props.type}
                                    placeholder={props.placeholder} /> : 
                    <Form.Control   isInvalid={true} 
                                    name={props.name}
                                    onChange={props.onChange}
                                    type={props.type}
                                    placeholder={props.placeholder} />;        
    }else{
        return <Form.Control 
                    name={props.name}
                    onChange={props.onChange}
                    type={props.type}
                    placeholder={props.placeholder}/>;
    }

    
}

export default InputText;