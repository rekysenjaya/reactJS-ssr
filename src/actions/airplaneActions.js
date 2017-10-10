import * as types from './actionTypes';
import request from 'superagent'

let token = localStorage.getItem('travel') && JSON.parse(localStorage.getItem('travel')).token ? JSON.parse(localStorage.getItem('travel')).token : null;
        
export function addData(id, name, flight_time, seat, from_city, destination_city) {
  return { type: types.ADD_AIRPLANE_DATA, id, name, flight_time, seat, from_city, destination_city }
}

export function editData(id, name, flight_time, seat, from_city, destination_city) {
  return { type: types.EDIT_AIRPLANE_DATA, id, name, flight_time, seat, from_city, destination_city}
}

export function deleteData(id) {
  return { type: types.DELETE_AIRPLANE_DATA, id }
}

export function deleteAll() {
  return { type: types.DELETE_AIRPLANE_ALL }
}

export function loadData() {
  return { type: types.LOAD_AIRPLANE_DATA }
}

export function airplane() {
  return dispatch => {
    dispatch(loadData());
    return request
      .get(`/airplane`)
      .set('token', token)
      .end((err, res) => {
        if (err) {
          dispatch(loadAirplaneFailure())
        } else {
          dispatch(loadAirplaneSuccess(res.body))
        }
      })
  }
}

export function loadAirplane(skip, limit) {
  return dispatch => {
    dispatch(loadData());
    return request
      .get(`/airplane/${skip}/${limit}`)
      .set('token', token)
      .end((err, res) => {
        if (err) {
          dispatch(loadAirplaneFailure())
        } else {
          dispatch(loadAirplaneSuccess(res.body))
        }
      })
  }
}

export function loadAirplaneSuccess(airplane) {
  return { type: types.LOAD_AIRPLANE_SUCCESS, airplane }
}

export function loadAirplaneFailure() {
  return { type: types.LOAD_AIRPLANE_FAILURE }
}

export function addAirplane(name, flight_time, seat, from_city, destination_city) {
  let id = Date.now()
  return dispatch => {
    dispatch(addData(`${id}`, name, flight_time, seat, from_city, destination_city))
    return request
      .post(`/airplane`)
      .set('token', token)
      .type('form')
      .send({ id: id })
      .send({ name: name })
      .send({ flight_time: flight_time })
      .send({ seat: seat })
      .send({ from_city: from_city })
      .send({ destination_city: destination_city })
      .end((err, res) => {
        if (err) {
          dispatch(addAirplaneFailure());
        } else {
          dispatch(addAirplaneSuccess(res.body));
        }
      })
  }
}

export function addAirplaneFailure() {
  return { type: types.ADD_AIRPLANE_FAILURE }
}

export function addAirplaneSuccess(airplane) {
  return { type: types.ADD_AIRPLANE_SUCCESS, airplane }
}


export function editAirplane(id, name, flight_time, seat, from_city, destination_city) {
  return dispatch => {
    dispatch(editData(id, name, flight_time, seat, from_city, destination_city))
    return request
      .put(`/airplane/${id}`)
      .set('token', token)
      .type('form')
      .send({ name: name })
      .send({ flight_time: flight_time })
      .send({ seat: seat })
      .send({ from_city: from_city })
      .send({ destination_city: destination_city })
      .end((err, res) => {
        if (err) {
          dispatch(editAirplaneFailure());
        } else {
          dispatch(editAirplaneSuccess(res.body));
        }
      })
  }
}

export function editAirplaneFailure() {
  return { type: types.EDIT_AIRPLANE_FAILURE }
}

export function editAirplaneSuccess(airplane) {
  return { type: types.EDIT_AIRPLANE_SUCCESS, airplane }
}

export function deleteAirplane(id) {
  return dispatch => {
    dispatch(deleteData(id))
    return request
      .delete(`/airplane/${id}`)
      .set('token', token)
      .end((err, res) => {
        if (err) {
          dispatch(deleteAirplaneFailure());
        } else {
          dispatch(deleteAirplaneSuccess(res.body));
        }
      })
  }
}

export function deleteAirplaneFailure() {
  return { type: types.DELETE_AIRPLANE_FAILURE }
}

export function deleteAirplaneSuccess(airplane) {
  return { type: types.DELETE_AIRPLANE_SUCCESS, airplane }
}
