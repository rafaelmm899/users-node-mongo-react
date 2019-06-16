import React, { Component } from "react";
import { Table, Button } from "react-bootstrap";

export class BuilTable extends Component {
    renderHeader(fields) {
        return (
            <tr>
                {fields.map((field, index) => {
                    return (
                        <th key={index} colSpan={field.colspan}>
                            {field.title}
                        </th>
                    );
                })}
            </tr>
        );
    }

    renderTableData(users) {
        return users.map(user => {
            return (
                <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.lastname}</td>
                    <td>{user.email}</td>
                    <td>{user.country}</td>
                    <td>
                        <Button variant="success">Edit</Button>
                    </td>
                    <td>
                        <Button variant="danger">Delete</Button>
                    </td>
                </tr>
            );
        });
    }

    render() {
        return (
            <Table responsive>
                <thead>{this.renderHeader(this.props.headers)}</thead>
                <tbody>{this.renderTableData(this.props.users)}</tbody>
            </Table>
        );
    }
}
