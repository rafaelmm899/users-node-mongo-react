import React, { Component } from "react";
import { UserList } from "./UserList";
import { Row, Col, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Container } from "react-bootstrap";

export class Dashboard extends Component {
    render() {
        return (
            <div>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="#home">
                        User administration
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <NavDropdown title="Action" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/login">
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Container>
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
                </Container>
            </div>
        );
    }
}
