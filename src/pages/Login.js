import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import * as todoUsers from '../actions/usersActions';
import { connect } from 'react-redux';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editData: {}
        }
    }

    message(val) {
        setTimeout(function () {
            this.props.actions.todoUsers.Message('')
        }.bind(this), 3000);
        this.props.actions.todoUsers.Message(val)
    }

    validation() {
        let { email, password } = this.state.editData;

        let lastAtPos = email.lastIndexOf('@');
        let lastDotPos = email.lastIndexOf('.');
        if (typeof email !== "undefined" && !(lastAtPos < lastDotPos && lastAtPos > 0 && email.indexOf('@@') == -1 && lastDotPos > 2 && (email.length - lastDotPos) > 2)) {
            this.message('Email is not valid');
            return true;
        } else if (typeof password !== "undefined" && password.length <= 5) {
            this.message('Password min length 6');
            return true;
        } else {
            return false;
        }
    }

    handleSave() {
        let { email, password } = this.state.editData;
        if (!password || !email) {
            this.message('Please enter all value');
            return true;
        }

        if (!this.validation()) {

            this.props.actions.todoUsers.loginUsers({ email, password });

            this.setState({
                editData: {}
            })
        }
    }

    handleChange(val) {
        this.setState({
            editData: {
                ...this.state.editData, [val.target.name]: val.target.value
            }
        })
    }

    render() {
        const { editData } = this.state;
        const { users } = this.props.state;

        return (
            <div id="wrapper">
                <h1 className="center">Travel<b>KU</b></h1>
                <hr />
                <div className="modal-content animate"  >
                    <h3 className="center">Log <b>In</b></h3>
                    <hr />
                    <div className="container">
                        <label><b>Name</b></label>
                        <br />
                        <input type="text" placeholder="Enter Email" name="email" value={editData.email || ''} onChange={this.handleChange.bind(this)} />
                        <br />
                        <label><b>Password</b></label>
                        <br />
                        <input type="password" placeholder="Enter Password" name="password" value={editData.password || ''} onChange={this.handleChange.bind(this)} onKeyDown={(e) => {
                            if (e.keyCode !== 13)
                                return;
                            this.handleSave()
                        }} />
                        <br />
                        {users.password.message && <div style={{ backgroundColor: '#f0ad4e', padding: '5px', boxShadow: '2px 6px 4px -4px black' }} >{users.password.message}</div>}
                        <hr />
                        <span >Forgot <a href="/forgot_password">password?</a></span>
                        <hr />
                        <div className="clearfix">

                            <button onClick={this.handleSave.bind(this)} className="button">Login</button>
                            <a href="/register" className="button button2">Sign Up</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        state: {
            users: state.users
        }
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            todoUsers: bindActionCreators(todoUsers, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);