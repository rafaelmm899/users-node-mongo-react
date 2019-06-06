import React from 'react'
import { Alert } from 'react-bootstrap';

export const Message = ({props}) => {
    return (props.message) ? <Alert variant={props.type}>{props.message}</Alert> : null
}