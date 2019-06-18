import React, { Component } from "react";
import { Table, Button, Form } from "react-bootstrap";

export class BuilTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: this.props.users
        };
    }

    static defaultProps = {
        users: []
    };

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

    renderRow(user) {
        return (
            <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.lastname}</td>
                <td>{user.email}</td>
                <td>{user.country}</td>
                <td>
                    <Button
                        variant="success"
                        onClick={e => this.handleClickEdit(user, true)}
                    >
                        Edit
                    </Button>
                </td>
                <td>
                    <Button variant="danger">Delete</Button>
                </td>
            </tr>
        );
    }

    handleClickEdit(dataUser, type) {
        const { users } = this.state;
        users.map(user => {
            if (user._id === dataUser._id) {
                user.edit = type;
            }
            return type;
        });

        this.setState({
            users
        });
    }

    renderFormEdit(user) {
        return (
            <tr key={user._id}>
                <td>
                    <Form.Control type="text" defaultValue={user.name} />
                </td>
                <td>
                    <Form.Control type="text" defaultValue={user.lastname} />
                </td>
                <td>
                    <Form.Control type="text" defaultValue={user.email} />
                </td>
                <td>
                    <Form.Control type="text" defaultValue={user.country} />
                </td>
                <td>
                    <Button variant="success">Save</Button>
                </td>
                <td>
                    <Button
                        variant="danger"
                        onClick={e => this.handleClickEdit(user, false)}
                    >
                        Cancel
                    </Button>
                </td>
            </tr>
        );
    }

    renderTableData(users) {
        return users.map(user => {
            return user.edit ? this.renderFormEdit(user) : this.renderRow(user);
        });
    }

    render() {
        const { users } = this.state;
        return (
            <Table responsive>
                <thead>{this.renderHeader(this.props.headers)}</thead>
                <tbody>{this.renderTableData(users)}</tbody>
            </Table>
        );
    }
}
