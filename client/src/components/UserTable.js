import React, { Component } from "react";
import { Table, Button, Form } from "react-bootstrap";
import { withRouter } from "react-router-dom";

class UserTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: this.props.users,
            usersEdit: this.props.users
        };
    }

    static defaultProps = {
        users: [],
        usersEdit: []
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

    updateUser(user, index) {
        fetch(`http://localhost:3789/api/user-update/${user._id}`, {
            method: "PUT",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .catch(error => console.log("error", error))
            .then(response => {
                if (response.userUpdated) {
                    let { users } = this.state;
                    users[index] = response.userUpdated;
                    this.setState({
                        users
                    });
                }
            });
    }

    renderRow(user, index) {
        return (
            <tr key={user._id}>
                {this.renderCol(user, index)}
                <td>
                    {user.edit ? (
                        <Button
                            variant="success"
                            id="save"
                            onClick={e =>
                                this.updateUser(
                                    this.state.usersEdit[index],
                                    index
                                )
                            }
                        >
                            Save
                        </Button>
                    ) : (
                        <Button
                            variant="success"
                            onClick={e => this.handleClickEdit(user, true)}
                        >
                            Edit
                        </Button>
                    )}
                </td>
                <td>
                    {user.edit ? (
                        <Button
                            variant="danger"
                            onClick={e => this.handleClickEdit(user, false)}
                        >
                            Cancel
                        </Button>
                    ) : (
                        <Button variant="danger">Delete</Button>
                    )}
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

    handleChange = (index, input) => {
        let usersEdit = this.state.users;
        usersEdit[index][input.target.name] = input.target.value;

        this.setState({
            usersEdit
        });
    };

    renderCol(user, index) {
        const col = [],
            headers = this.props.headers.map(header => {
                return header.title;
            });

        for (const data in user) {
            if (headers.includes(data)) {
                col.push(
                    <td key={Object.keys(data)}>
                        {user.edit ? (
                            <Form.Control
                                type="text"
                                name={data}
                                onChange={e => {
                                    this.handleChange(index, e);
                                }}
                                defaultValue={user[data]}
                            />
                        ) : (
                            user[data]
                        )}
                    </td>
                );
            }
        }
        return col;
    }

    render() {
        const { users } = this.state;
        return (
            <Table responsive>
                <thead>{this.renderHeader(this.props.headers)}</thead>
                <tbody>
                    {users.map((user, index) => {
                        return this.renderRow(user, index);
                    })}
                </tbody>
            </Table>
        );
    }
}

export default withRouter(UserTable);
