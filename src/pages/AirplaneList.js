import React, { Component } from 'react';


class AirplaneList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { data, edit, deleteData } = this.props;
        return (
            <tr>
                <td>{data.name}</td>
                <td>{data.flight_time}</td>
                <td>{data.seat}</td>
                <td>{data.from_city}</td>
                <td>{data.destination_city}</td>
                <td>
                    <button onClick={() => edit(data)} className="button">Edit</button>
                    <button onClick={() => { const r = confirm(`Delete data ${data.name}?`); if (r == true) deleteData(data.id) }} className="button button3">Delete</button>
                </td>
            </tr>
        )
    }
}

export default AirplaneList;