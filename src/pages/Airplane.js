import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import * as todoAirplane from '../actions/airplaneActions';
import { connect } from 'react-redux';

import Menu from '../components/menu';
import List from './AirplaneList';

class Airplane extends Component {
    constructor(props) {
        super(props);

        this.state = {
            errorText: '',
            editData: {},
            modal: 'none'
        }
    }

    validateTime(strTime) {
        var regex = new RegExp("^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$");
        if (regex.test(strTime)) {
            return true;
        } else {
            return false;
        }
    }

    message(val) {
        this.setState({
            errorText: val
        })
        setTimeout(function () {
            this.setState({
                errorText: ''
            })
        }.bind(this), 3000);
    }

    handleEdit(data) {
        this.setState({
            editData: data,
            modal: 'block'
        })
    }

    handleDelete(id) {
        this.props.actions.todoAirplane.deleteAirplane(id);
    }

    handleSave(e) {
        e.preventDefault();
        const { id, name, flight_time, seat, from_city, destination_city } = this.state.editData;

        if (!name || !flight_time || !seat || !from_city || !destination_city)
            return this.message('Please enter all value')

        if (!this.validateTime(flight_time))
            return this.message('Please format Flight Time "HH:mm"')

        if (!id)
            this.props.actions.todoAirplane.addAirplane(name, flight_time, seat, from_city, destination_city);
        else
            this.props.actions.todoAirplane.editAirplane(id, name, flight_time, seat, from_city, destination_city);

        this.setState({
            errorText: '',
            editData: {},
            modal: 'none'
        })
    }

    handleChange(val) {
        this.setState({
            editData: {
                ...this.state.editData, [val.target.name]: val.target.value
            }
        })
    }

    render() {
        const { editData, modal, errorText } = this.state;

        const handleEdit = this.handleEdit.bind(this);
        const handleDelete = this.handleDelete.bind(this);

        let data = this.props.state.airplane;
        let list = null;
        if (data.length !== 0)
            list = data.map(function (val, indx) {
                return (<List key={indx} data={val} edit={handleEdit} deleteData={handleDelete} />)
            })
        return (
            <div>
                <Menu />

                <div className="content">
                    <h1>List Airplane</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Flight Time</th>
                                <th>Seat</th>
                                <th>From City</th>
                                <th>Destination City</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list}
                        </tbody>
                    </table>

                    <button className="button button2" onClick={() => this.setState({ modal: 'block' })} style={{ width: 'auto' }} >Add</button>

                    <div id="id01" style={{ display: modal }} className="modal">
                        <span onClick={() => this.setState({ modal: 'none' })} className="close" title="Close Modal">×</span>
                        <form className="modal-content animate" onSubmit={this.handleSave.bind(this)} >
                            <div className="container">
                                <input type="hidden" value={editData.id || ''} />
                                <label><b>Name</b></label>
                                <br />
                                <input type="text" placeholder="Enter Name" name="name" value={editData.name || ''} onChange={this.handleChange.bind(this)} required />
                                <br />
                                <label><b>Flight Time</b></label>
                                <br />
                                <input type="time" placeholder="HH:mm" name="flight_time" value={editData.flight_time || ''} onChange={this.handleChange.bind(this)} required />
                                <br />
                                <label><b>Seat</b></label>
                                <br />
                                <input type="number" placeholder="Enter Seat" value={editData.seat || ''} name="seat" onChange={this.handleChange.bind(this)} required />
                                <br />
                                <label><b>From City</b></label>
                                <br />
                                <input type="text" placeholder="Enter From City" value={editData.from_city || ''} name="from_city" onChange={this.handleChange.bind(this)} required />
                                <br />
                                <label><b>Destination City</b></label>
                                <br />
                                <input type="text" placeholder="Enter Destination City" value={editData.destination_city || ''} name="destination_city" onChange={this.handleChange.bind(this)} required />
                                <br />
                                {errorText && <div style={{ backgroundColor: '#f0ad4e', padding: '5px', boxShadow: '2px 6px 4px -4px black' }} >{errorText}</div>}

                                <div className="clearfix">

                                    <button type="submit" className="button">Submit</button>
                                    <button onClick={() => this.setState({ modal: 'none' })} className="button button3">Cancel</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        state: {
            airplane: state.airplane
        }
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            todoAirplane: bindActionCreators(todoAirplane, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Airplane);