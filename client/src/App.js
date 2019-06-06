import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from "react-router-dom";
import {Login} from './pages/Login';
import { Container } from 'react-bootstrap';

export default class App extends Component {
    render(){
        return (
            <Container>
                <Switch>
                    <Route exact path="/" component={Login} />
                </Switch>
            </Container>
        );
    }
}