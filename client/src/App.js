import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Register } from "./pages/Register";
import { PrivateRoute } from "./components/PrivateRoute";
import { userService } from "./service/UserService";

export default class App extends Component {
    componentWillMount() {
        window.addEventListener("storage", e => {
            if (!userService.isAuthenticated()) {
                this.setState({
                    isAuthenticated: false
                });
            }
        });
    }

    render() {
        return (
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <PrivateRoute path="/" component={Dashboard} />
            </Switch>
        );
    }
}
