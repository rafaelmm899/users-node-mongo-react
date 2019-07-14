import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import UserTable from "../components/UserTable";
import { Message } from "../components/Message";

export class UserList extends Component {
    state = {
        users: [],
        headers: [
            { title: "name", colspan: 0 },
            { title: "lastname", colspan: 0 },
            { title: "email", colspan: 0 },
            { title: "dedication", colspan: 0 },
            { title: "city", colspan: 0 },
            { title: "country", colspan: 0 },
            { title: "Actions", colspan: 2 }
        ],
        alert: {
            type: null,
            message: null
        }
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

    handlerMessages = (type, message) => {
        this.setState({
            alert: {
                type,
                message
            }
        });
        console.log(this.state);
    };

    render() {
        const { users, headers } = this.state;

        return (
            <div>
                <Row>
                    <Col md={{ span: 12 }}>
                        <Message props={this.state.alert} />
                    </Col>
                </Row>
                <Row style={{ textAlign: "center" }}>
                    <Col md={{ span: 12 }}>
                        <h2>Users</h2>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    {users.length > 0 ? (
                        <UserTable
                            users={users}
                            headers={headers}
                            handlerMessages={this.handlerMessages}
                            modalConfirm={this.showModalConfirm}
                        />
                    ) : (
                        <div />
                    )}
                </Row>
            </div>
        );
    }
}
