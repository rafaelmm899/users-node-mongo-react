import React, { Component } from "react";
import { UserList } from "./UserList";
import { Row, Col } from "react-bootstrap";

export class Dashboard extends Component {
    render() {
        return (
            <Row
                className="justify-content-md-center"
                style={{ marginTop: "10%" }}
            >
                <Col
                    sm="12"
                    md="12"
                    className="shadow-sm p-3 mb-5 bg-light rounded"
                >
                    <UserList />
                </Col>
            </Row>
        );
    }
}
