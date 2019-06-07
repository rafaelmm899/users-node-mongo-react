import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from "react-router-dom";
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { PrivateRoute } from './components/PrivateRoute';
import { Container } from 'react-bootstrap';
import { isAuthenticated } from './components/Authentication';

export default class App extends Component {

    state = {
        isAuthenticated : isAuthenticated()
    }

    componentWillMount(){
        window.addEventListener('storage', (e) => {
            if(!isAuthenticated()){
                this.setState({
                    isAuthenticated : false
                })
            }
        })
    }

    render(){
        return (
            <Container>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <PrivateRoute path="/dashboard" component={Dashboard} />
                </Switch>
            </Container>
        );
    }
}