import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import BuilTable from "../components/BuildTable";

export class UserList extends Component {
    state = {
        users: []
    };

    componentDidMount() {
        fetch("http://localhost:3789/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .catch(error => console.log("error", error))
            .then(response => {
                let { users } = response;
                if (users) {
                    this.setState({
                        users
                    });
                }

                console.log(this.state);
            });
    }

    render() {
        const { users } = this.state;
        return (
            <div>
                <Row style={{ textAlign: "center" }}>
                    <Col md={{ span: 12 }}>
                        <h2>Users</h2>
                    </Col>
                </Row>
                <Row>
                    {users.length > 0 ? <BuilTable users={users} /> : <div />}
                </Row>
            </div>
        );
    }
}
