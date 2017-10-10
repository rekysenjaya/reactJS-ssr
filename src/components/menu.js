import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import * as todoUsers from '../actions/usersActions';
import * as todoAirplane from '../actions/airplaneActions';
import { connect } from 'react-redux';


class Menu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: 'none'
        }
    }


    stripTrailingSlash(url) {
        const array = url.split('/');

        const lastsegment = array[array.length - 1];
        return lastsegment;
    }

    render() {
        const getUrl = this.stripTrailingSlash(window.location.href);

        return (
            <ul className="sidenav">
                <li><a className={getUrl == '' && `active`} href="/">Home</a></li>
                <li><a className={getUrl == 'airplanes' && `active`} href="/airplanes">Airplane</a></li>
                <li><a className={getUrl == 'profiles' && `active`} href="/profiles">Profile</a></li>
                <li><a className="" href="/" onClick={() => {

                    localStorage.setItem('travel', JSON.stringify({ cekPage: false }));

                    window.location.href = `/`;
                }} >Logout</a></li>
            </ul>
        )
    }
}

export default Menu;