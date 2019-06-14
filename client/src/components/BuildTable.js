import React from "react";
import { Table } from "react-bootstrap";

const BuilTable = props => {
    console.log(props);
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                </tr>
            </thead>
            <tbody>
                {props.users.map(user => {
                    return (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.lastname}</td>
                            <td>{user.email}</td>
                            <td>{user.country}</td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
};

export default BuilTable;
