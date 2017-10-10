import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import * as todoUsers from '../actions/usersActions';
import * as todoAirplane from '../actions/airplaneActions';
import { connect } from 'react-redux';

import Menu from '../components/menu';

import Icon from '../../public/image/travel.jpg';

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: 'none'
        }
    }

    render() {
        let data = this.props.state.airplane;
        let list = null;
        if (data.length !== 0)
            list = data.map(function (val, indx) {
                return (
                    <article key={indx} className="card">
                        <a>
                            <div className="card-content">
                                <p>
                                    <b>{val.name}</b>
                                    <br />
                                    {val.from_city} - {val.destination_city}
                                    <br />
                                    {val.flight_time} WIB
                                    <br />
                                    <b>available {val.seat} seats</b>
                                </p>
                            </div>
                        </a>
                    </article>
                )
            })
        return (
            <div>
                <Menu />

                <div className="content">
                    <div>
                        <img src={Icon} className="icon" />
                    </div>
                    <div>
                        <h1><b>Airline</b> Schedules</h1>
                    </div>
                    <hr />
                    <section className="cards">
                        {list}
                    </section>
                </div>
            </div>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);