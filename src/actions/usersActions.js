import * as types from './actionTypes';
import request from 'superagent'

let token = localStorage.getItem('travel') && JSON.parse(localStorage.getItem('travel')).token ? JSON.parse(localStorage.getItem('travel')).token : null;


export function addData(data) {
  return { type: types.ADD_USER_DATA, data }
}

export function editData(data) {
  return { type: types.EDIT_USER_DATA, data }
}

export function deleteData(id) {
  return { type: types.DELETE_USER_DATA, id }
}

export function deleteAll() {
  return { type: types.DELETE_USER_ALL }
}

export function loadData() {
  return { type: types.LOAD_USER_DATA }
}

export function users() {
  return dispatch => {
    dispatch(loadData());
    return request
      .get(`/user`)
      .set('token', token)
      .end((err, res) => {
        if (err) {
          dispatch(loadUsersFailure())
        } else {
          dispatch(loadUsersSuccess(res.body))
        }
      })
  }
}

export function loadUsers(skip, limit) {
  return dispatch => {
    dispatch(loadData());
    return request
      .get(`/user/${skip}/${limit}`)
      .set('token', token)
      .end((err, res) => {
        if (err) {
          dispatch(loadUsersFailure())
        } else {
          dispatch(loadUsersSuccess(res.body))
        }
      })
  }
}

export function loadUsersSuccess(users) {
  return { type: types.LOAD_USER_SUCCESS, users }
}

export function loadUsersFailure() {
  return { type: types.LOAD_USER_FAILURE }
}
export function addUsers(data) {
  console.log(data)
  let id = Date.now()

  data = { ...data, id }

  return dispatch => {
    return request
      .post('/user')
      .set('Content-Type', 'application/json')
      .set('token', 'register')
      .send(data)
      .end((err, res) => {
        if (err) {
          setTimeout(function () {
            dispatch(Message(''))
          }, 3000);
          dispatch(Message('Please check your connection!'))
        } else {
          setTimeout(function () {
            dispatch(Message(''))
          }, 3000);
          if (!res.body.status) {
            return dispatch(Message('Email already exists!'))
          }
          dispatch(Message('Successful registration'))
        }
      })
  }
}

export function addUsersFailure() {
  return { type: types.ADD_USER_FAILURE }
}

export function addUsersSuccess(users) {
  return { type: types.ADD_USER_SUCCESS, users }
}


export function editUsers(data) {
  return dispatch => {
    dispatch(editData(data))
    return request
      .put(`/user/${data.id}`)
      .set('Content-Type', 'application/json')
      .send(data)
      .end((err, res) => {
        if (err) {
          dispatch(editUsersFailure());
        } else {
          dispatch(editUsersSuccess(res.body));
        }
      })
  }
}

export function editUsersFailure() {
  return { type: types.EDIT_USER_FAILURE }
}

export function editUsersSuccess(users) {
  return { type: types.EDIT_USER_SUCCESS, users }
}

export function loginUsers(data) {

  return dispatch => {
    return request
      .post(`/user/login`)
      .set('Content-Type', 'application/json')
      .set('token', 'register')
      .send(data)
      .end((err, res) => {
        if (err) {
          setTimeout(function () {
            dispatch(Message(''))
          }, 3000);
          dispatch(Message('Please check your connection!'))
        } else {
          setTimeout(function () {
            dispatch(Message(''))
          }, 3000);
          if (!res.body.status) {
            return dispatch(Message('Email And Password not exists!'))
          }

          localStorage.setItem('travel', JSON.stringify({ token: res.body.token, cekPage: true }));

          window.location.href = `/`;
          dispatch(Message('Successfully'))
        }
      })
  }
}

export function forgotPasswordUsers(data) {

  return dispatch => {
    return request
      .put(`/user/forgot_password`)
      .set('Content-Type', 'application/json')
      .set('token', 'register')
      .send(data)
      .end((err, res) => {
        if (err) {
          setTimeout(function () {
            dispatch(Message(''))
          }, 3000);
          dispatch(Message('Please check your connection!'))
        } else {
          setTimeout(function () {
            dispatch(Message(''))
          }, 3000);
          if (!res.body.status) {
            return dispatch(Message('Email not exists!'))
          }
          dispatch(Message('Change password successfully'))
        }
      })
  }
}

export function deleteUsers(id) {
  return dispatch => {
    dispatch(deleteData(id))
    return request
      .delete(`/user/${id}`)
      .end((err, res) => {
        if (err) {
          dispatch(deleteUsersFailure());
        } else {
          dispatch(deleteUsersSuccess(res.body));
        }
      })
  }
}

export function deleteUsersFailure() {
  return { type: types.DELETE_USER_FAILURE }
}

export function deleteUsersSuccess(users) {
  return { type: types.DELETE_USER_SUCCESS, users }
}

export function Message(message) {
  return { type: types.MESSAGE_USER, message }
}

export function Page(page) {
  return dispatch => {
    return fetch('/api/page', {
      method: 'post',
      body: JSON.stringify({ page }),
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
  }
  // return dispatch => {
  //   return request
  //     .post(`/api/page`)
  //     .set('Content-Type', 'application/json')
  //     .send(page)
  //     .end((err, res) => {
  //       if (err) {
  //         console.log('gagal')
  //       } else {
  //         console.log(res)
  //       }
  //     })
  // }
}
