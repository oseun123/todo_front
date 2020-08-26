import axios from "axios";
import { BASE_URL, token } from "../../config";
import Cookies from "js-cookie";
export const resetUsersState = (dispatch) => {
  dispatch({ type: "CLEAR_USERS_ERRORS" });
};

export const login = async (dispatch, user) => {
  try {
    dispatch({ type: "CLEAR_USERS_ERRORS" });
    dispatch({ type: "START_SPINNER" });

    const headers = {
      "Content-Type": "application/json",
    };
    const result = await axios({
      method: "POST",
      url: `${BASE_URL}/api/auth/sign_in`,
      headers: headers,
      data: user,
    });

    Cookies.set(token, result.data.payload.token);
    dispatch({ type: "STOP_SPINNER" });
    dispatch({ type: "SUCCESS_LOGIN", payload: result.data });

    return result;
  } catch (error) {
    dispatch({ type: "STOP_SPINNER" });
    const resMessage = error.response.data;
    dispatch({ type: "ERROR_SIGNUP", payload: resMessage });
  }
};

export const register = async (dispatch, newUser) => {
  try {
    dispatch({ type: "CLEAR_USERS_ERRORS" });
    dispatch({ type: "START_SPINNER" });
    const headers = {
      "Content-Type": "application/json",
    };
    const result = await axios({
      method: "POST",
      url: `${BASE_URL}/api/auth/sign_up`,
      headers: headers,
      data: newUser,
    });
    // console.log(result);\

    Cookies.set(token, result.data.payload.token);
    dispatch({ type: "STOP_SPINNER" });

    dispatch({ type: "SUCCESS_LOGIN", payload: result.data });
    return result;
  } catch (error) {
    dispatch({ type: "STOP_SPINNER" });
    const resMessage = error.response.data;
    dispatch({ type: "ERROR_SIGNUP", payload: resMessage });
  }
};

export const logOut = async (dispatch) => {
  Cookies.remove(token);
  dispatch({ type: "LOGOUT_USER" });
};

export const requestPasswordLink = async (dispatch, creds) => {
  // console.log(getState());
  dispatch({ type: "CLEAR_USERS_ERRORS" });
  dispatch({ type: "START_SPINNER" });
  let result;

  const headers = {
    "Content-Type": "application/json",
  };
  await axios({
    method: "POST",
    url: `${BASE_URL}/api/auth/forget_password`,
    headers: headers,
    data: creds,
  })
    .then((res) => {
      const resMessage = res.data;
      dispatch({ type: "REQUEST_PASSWORD_LINK_SUCCESS", payload: resMessage });
      dispatch({ type: "STOP_SPINNER" });
      // console.log(resMessage);
      result = resMessage;
    })
    .catch((err) => {
      // alert("here");
      const resMessage = err.response.data;
      // console.log(resMessage);
      dispatch({ type: "STOP_SPINNER" });
      dispatch({ type: "ERROR_REQUEST_PASSWORD_LINK", payload: resMessage });
      result = resMessage;
    });
  return result;
};

export const resetPassword = async (dispatch, creds) => {
  dispatch({ type: "CLEAR_USERS_ERRORS" });
  dispatch({ type: "START_SPINNER" });
  let result;

  const headers = {
    "Content-Type": "application/json",
  };
  await axios({
    method: "POST",
    url: `${BASE_URL}/api/auth/reset_password/${creds.token}`,
    headers: headers,
    data: creds,
  })
    .then((res) => {
      const resMessage = res.data;
      dispatch({ type: "RESET_PASSWORD_SUCCESS", payload: resMessage });
      dispatch({ type: "STOP_SPINNER" });
      result = resMessage;
    })
    .catch((err) => {
      const resMessage = err.response.data;
      dispatch({ type: "STOP_SPINNER" });
      dispatch({ type: "ERROR_RESET_PASSWORD", payload: resMessage });
      result = resMessage;
    });
  return result;
};
