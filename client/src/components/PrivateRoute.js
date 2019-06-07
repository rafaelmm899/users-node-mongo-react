import React from 'react';
import { Route, Redirect } from "react-router-dom";
import {isAuthenticated} from './Authentication';

export const PrivateRoute = ({ component: Component }) => {

    return (
        <Route
            render={props =>
                isAuthenticated() ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    );
}