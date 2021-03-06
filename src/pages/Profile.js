import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import * as todoUsers from '../actions/usersActions';
import { connect } from 'react-redux';

import Menu from '../components/menu';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editData: {
                image: ''
            },
            modal: 'none'
        }
    }

    componentDidMount() {
        let user = localStorage.getItem('travel') && JSON.parse(localStorage.getItem('travel')).user ? JSON.parse(localStorage.getItem('travel')).user : null;

        this.setState({
            editData: { ...this.state.editData, ...user }
        })
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
        let { editData } = this.state;
        if (!this.validation()) {

            this.props.actions.todoUsers.updateUsers(editData);
        }
    }

    handleChange(val) {
        this.setState({
            editData: {
                ...this.state.editData, [val.target.name]: val.target.value
            }
        })
    }


    getPhoto(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                editData: {
                    ...this.state.editData, image: reader.result
                }
            });
        }

        reader.readAsDataURL(file);
    }

    render() {
        const { editData } = this.state;
        const { users } = this.props.state;
        
        return (
            <div id="wrapper">
                <Menu />
                <div className="content">
                    <h1>Profile</h1>
                    <hr />
                    <div className="modal-content animate"  >
                        <div className="container">
                            {editData.image.length > 100 && <img className="img-cover" src={this.state.editData.image} />}

                            <br />
                            <input type="hidden" value={editData.id || ''} />
                            <label><b>Foto</b></label>
                            <br />
                            <input type='file' onChange={this.getPhoto.bind(this)} />
                            <br />
                            <label><b>Email</b></label>
                            <br />
                            <input type="text" placeholder="Enter Email" name="email" value={editData.email || ''} onChange={this.handleChange.bind(this)} />
                            <br />
                            <label><b>First Name</b></label>
                            <br />
                            <input type="text" placeholder="Enter First Name" name="firstname" value={editData.firstname || ''} onChange={this.handleChange.bind(this)} />
                            <br />
                            <label><b>Last Name</b></label>
                            <br />
                            <input type="text" placeholder="Enter Last Name" value={editData.lastname || ''} name="lastname" onChange={this.handleChange.bind(this)} />
                            <br />
                            <label><b>Password</b></label>
                            <br />
                            <input type="password" placeholder="Enter Password" value={editData.password || ''} name="password" onChange={this.handleChange.bind(this)} />
                            <br />
                            {users.password.message && <div style={{ backgroundColor: '#f0ad4e', padding: '5px', boxShadow: '2px 6px 4px -4px black' }} >{users.password.message}</div>}

                            <div className="clearfix">

                                <button type="submit" onClick={this.handleSave.bind(this)} className="button">Submit</button>
                                <button onClick={() => this.setState({ modal: 'none' })} className="button button3">Cancel</button>
                            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);