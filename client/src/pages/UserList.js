import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import UserTable from "../components/UserTable";

export class UserList extends Component {
    state = {
        users: [],
        headers: [
            { title: "name", colspan: 0 },
            { title: "lastname", colspan: 0 },
            { title: "email", colspan: 0 },
            { title: "country", colspan: 0 },
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
                    console.log(users);
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
                        <UserTable users={users} headers={headers} />
                    ) : (
                        <div />
                    )}
                </Row>
            </div>
        );
    }
}
