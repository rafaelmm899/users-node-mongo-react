import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { BuilTable } from "../components/BuildTable";

export class UserList extends Component {
    state = {
        users: [],
        headers: [
            { title: "First Name", colspan: 0 },
            { title: "Last Name", colspan: 0 },
            { title: "Email", colspan: 0 },
            { title: "Country", colspan: 0 },
            { title: "Actions", colspan: 2 }
        ]
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
            });
    }

    render() {
        const { users, headers } = this.state;
        return (
            <div>
                <Row style={{ textAlign: "center" }}>
                    <Col md={{ span: 12 }}>
                        <h2>Users</h2>
                    </Col>
                </Row>
                <Row>
                    {users.length > 0 ? (
                        <BuilTable users={users} headers={headers} />
                    ) : (
                        <div />
                    )}
                </Row>
            </div>
        );
    }
}
