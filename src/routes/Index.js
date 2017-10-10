import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { bindActionCreators } from 'redux';
import * as todoUsers from '../actions/usersActions';
import * as todoAirplane from '../actions/airplaneActions';
import { connect } from 'react-redux';

import Dashboard from '../pages/Dashboard';
import Airplane from '../pages/Airplane';
import Profile from '../pages/Profile';
import Login from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword'
import Register from '../pages/Register';
import NotFound from '../pages/NotFound';

import sass from '../../public/css/admin.scss';

class Routes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cekPage: false
        }
    }
    componentDidMount() {
        this.props.actions.todoAirplane.airplane()

        let cekPage = localStorage.getItem('travel') && JSON.parse(localStorage.getItem('travel')).cekPage ? JSON.parse(localStorage.getItem('travel')).cekPage : null;

        if (cekPage)
            this.setState({
                cekPage: true
            })

        const getUrl = this.stripTrailingSlash(window.location.href);
        let arr = ['', 'forgot_password', 'register']
        if (cekPage)
            arr = ['', 'airplanes', 'profiles']

        const a = arr.filter(data => data == getUrl)

        if (a.length == 0)
            window.location.href = `/`;

    }

    stripTrailingSlash(url) {
        const array = url.split('/');

        const lastsegment = array[array.length - 1];
        return lastsegment;
    }

    render() {
        const { cekPage } = this.state;

        return (
            <Router>
                <Switch>
                    {cekPage &&
                        <Switch>
                            <Route exact path='/' component={Dashboard} />
                            <Route exact path='/airplanes' component={Airplane} />
                            <Route exact path='/profiles' component={Profile} />
                        </Switch>
                    }

                    {!cekPage &&
                        <Switch>
                            <Route exact path='/' component={Login} />
                            <Route exact path='/forgot_password' component={ForgotPassword} />
                            <Route exact path='/register' component={Register} />
                        </Switch>
                    }
                </Switch>
            </Router>
        );
    }
}


function mapStateToProps(state) {
    return {
        state: {
            users: state.users,
            airplane: state.airplane
        }
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            todoUsers: bindActionCreators(todoUsers, dispatch),
            todoAirplane: bindActionCreators(todoAirplane, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Routes);