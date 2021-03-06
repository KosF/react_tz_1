import isAuth from "Src/helpers/checkCredentials";
import { setCookie } from "Src/helpers/cookie";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOG_OUT
} from "./authConstants";

export const loginRequest = userName => ({
  type: LOGIN_REQUEST,
  userName
});

export const loginSuccess = (userName, value) => ({
  type: LOGIN_SUCCESS,
  userName,
  isAuth: value
});

export const loginFailure = error => ({
  type: LOGIN_FAILURE,
  error
});

export function logIn(data, cb) {
  return dispatch => {
    dispatch(loginRequest(data.username));

    if (isAuth(data)) {
      dispatch(loginSuccess(data.username, true));
      cb();
    } else {
      dispatch(loginFailure);
    }
  };
}

export function logOut(cb) {
  return dispatch => {
    dispatch({
      type: LOG_OUT
    });

    setCookie("isAuth", false);
    cb();
  };
}
