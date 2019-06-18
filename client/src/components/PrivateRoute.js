import React from "react";
import { Route, Redirect } from "react-router-dom";
import { userService } from "../service/UserService";

export const PrivateRoute = ({ component: Component }) => {
    return (
        <Route
            render={props =>
                userService.isAuthenticated() ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    );
};
