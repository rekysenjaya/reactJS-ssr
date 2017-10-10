import * as types from '../actions/actionTypes';

const initialState = [];

export default function airplane(state = initialState, action) {
    switch (action.type) {
        case types.LOAD_AIRPLANE_DATA:
            return state

        case types.LOAD_AIRPLANE_SUCCESS:
            return [...state, ...action.airplane]

        case types.LOAD_AIRPLANE_ID_SUCCESS:
            return [action.airplane]

        case types.LOAD_AIRPLANE_FAILURE:
        case types.ADD_AIRPLANE_FAILURE:
        case types.EDIT_AIRPLANE_FAILURE:
            return state

        case types.ADD_AIRPLANE_DATA:
            return [
                {
                    id: action.id,
                    name: action.name,
                    flight_time: action.flight_time,
                    seat: action.seat,
                    from_city: action.from_city,
                    destination_city: action.destination_city
                },
                ...state
            ]

        case types.ADD_AIRPLANE_SUCCESS:
            return state

        case types.EDIT_AIRPLANE_DATA:
            return state.map(data => data.id === action.id ? Object.assign({}, data, { name: action.name, flight_time: action.flight_time, seat: action.seat, from_city: action.from_city, destination_city: action.destination_city }) : data)

        case types.EDIT_AIRPLANE_SUCCESS:
            return state

        case types.DELETE_AIRPLANE_DATA:
            return state.filter(data => data.id !== action.id)

        case types.DELETE_AIRPLANE_ALL:
            return []

        default:
            return state

    }
}

