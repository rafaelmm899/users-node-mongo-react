import React, { Component } from "react";
import { Table, Button, Form, Modal } from "react-bootstrap";
import { withRouter } from "react-router-dom";

class UserTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: this.props.users,
            usersEdit: this.props.users,
            smShow: false,
            userDelete: null
        };
    }

    static defaultProps = {
        users: [],
        usersEdit: [],
        userDelete: null
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
                    this.props.handlerMessages("success", "User Updated");
                }
            });
    }

    deleteUser() {
        var { user, index } = this.state.userDelete;
        fetch(`http://localhost:3789/api/user-delete/${user._id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .catch(error => console.log("error", error))
            .then(response => {
                if (response.user) {
                    let { users } = this.state;
                    users.splice(index, 1);
                    this.setState({
                        users,
                        smShow: false
                    });
                    this.props.handlerMessages("success", "User Deleted");
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
                        <Button
                            variant="danger"
                            onClick={() =>
                                this.setState({
                                    smShow: true,
                                    userDelete: {
                                        user,
                                        index
                                    }
                                })
                            }
                        >
                            Delete
                        </Button>
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
        let smClose = () => this.setState({ smShow: false, userDelete: null });
        return (
            <div>
                <Modal
                    size="sm"
                    show={this.state.smShow}
                    onHide={smClose}
                    aria-labelledby="example-modal-sizes-title-sm"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-sm">
                            Small Modal
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Are you sure you want to delete this user?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={e => this.deleteUser()}
                        >
                            Yes
                        </Button>
                        <Button
                            variant="primary"
                            onClick={() => this.setState({ smShow: false })}
                        >
                            No
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Table responsive>
                    <thead>{this.renderHeader(this.props.headers)}</thead>
                    <tbody>
                        {users.map((user, index) => {
                            return this.renderRow(user, index);
                        })}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default withRouter(UserTable);
