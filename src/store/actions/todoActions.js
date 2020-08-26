import axios from "axios";
import { BASE_URL, token } from "../../config";
import Cookies from "js-cookie";
export const resetTodosState = (dispatch) => {
  dispatch({ type: "CLEAR_TODO_ERRORS" });
};

export const createTodo = async (dispatch, creds) => {
  try {
    dispatch({ type: "CLEAR_TODO_ERRORS" });
    dispatch({ type: "START_TODO_SPINNER" });
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get(token)}`,
    };
    const result = await axios({
      method: "POST",
      url: `${BASE_URL}/api/todos`,
      headers: headers,
      data: creds,
    });
    // console.log(result);\

    // Cookies.set(token, result.data.payload.token);
    dispatch({ type: "STOP_TODO_SPINNER" });
    dispatch({ type: "SUCCESS_CREATE_TODO", payload: result.data });
    console.log(result.data);
    return result.data;
  } catch (error) {
    dispatch({ type: "STOP_TODO_SPINNER" });
    const resMessage = error.response.data;
    dispatch({ type: "ERROR_CREATE_TODO", payload: resMessage });
  }
};
export const addTodoItem = async (dispatch, creds, todo_id) => {
  try {
    dispatch({ type: "CLEAR_TODO_ERRORS" });
    dispatch({ type: "START_TODO_SPINNER" });
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get(token)}`,
    };
    const result = await axios({
      method: "POST",
      url: `${BASE_URL}/api/${todo_id}/todo-items`,
      headers: headers,
      data: creds,
    });
    // console.log(result);\

    // Cookies.set(token, result.data.payload.token);
    dispatch({ type: "STOP_TODO_SPINNER" });
    dispatch({ type: "SUCCESS_CREATE_TODO_ITEM", payload: result.data });
    console.log(result.data);
    return result.data;
  } catch (error) {
    dispatch({ type: "STOP_TODO_SPINNER" });
    const resMessage = error.response.data;
    dispatch({ type: "ERROR_CREATE_TODO", payload: resMessage });
  }
};

export const getAllTodos = async (dispatch) => {
  try {
    dispatch({ type: "CLEAR_TODO_ERRORS" });
    dispatch({ type: "START_TODO_SPINNER" });
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get(token)}`,
    };
    const result = await axios({
      method: "GET",
      url: `${BASE_URL}/api/todos`,
      headers: headers,
    });
    dispatch({ type: "STOP_TODO_SPINNER" });
    dispatch({ type: "SUCCESS_GET_ALL_TODO", payload: result.data });
    console.log(result.data);
    return result.data;
  } catch (error) {
    dispatch({ type: "STOP_TODO_SPINNER" });
    const resMessage = error.response.data;
    dispatch({ type: "ERROR_GET_ALL_TODO", payload: resMessage });
  }
};
export const deleteOneTodo = async (dispatch, id) => {
  try {
    dispatch({ type: "CLEAR_TODO_ERRORS" });
    dispatch({ type: "START_TODO_SPINNER" });
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get(token)}`,
    };
    const result = await axios({
      method: "DELETE",
      url: `${BASE_URL}/api/todos/${id}`,
      headers: headers,
    });
    dispatch({ type: "STOP_TODO_SPINNER" });
    dispatch({ type: "SUCCESS_DELETE_TODO", payload: result.data });
    console.log(result.data);
    return result.data;
  } catch (error) {
    dispatch({ type: "STOP_TODO_SPINNER" });
    const resMessage = error.response.data;
    dispatch({ type: "ERROR_DELETE_TODO", payload: resMessage });
  }
};
export const deleteTodoTask = async (dispatch, id) => {
  try {
    dispatch({ type: "CLEAR_TODO_ERRORS" });
    dispatch({ type: "START_TODO_SPINNER" });
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get(token)}`,
    };
    const result = await axios({
      method: "DELETE",
      url: `${BASE_URL}/api/todo-items/${id}`,
      headers: headers,
    });
    dispatch({ type: "STOP_TODO_SPINNER" });
    dispatch({ type: "SUCCESS_DELETE_TASK", payload: result.data });
    console.log(result.data);
    return result.data;
  } catch (error) {
    dispatch({ type: "STOP_TODO_SPINNER" });
    const resMessage = error.response.data;
    dispatch({ type: "ERROR_DELETE_TODO", payload: resMessage });
  }
};
export const updateTodoTask = async (dispatch, creds, id) => {
  try {
    dispatch({ type: "CLEAR_TODO_ERRORS" });
    dispatch({ type: "START_TODO_SPINNER" });
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get(token)}`,
    };
    const result = await axios({
      method: "PUT",
      url: `${BASE_URL}/api/todo-items/${id}`,
      headers: headers,
      data: creds,
    });
    dispatch({ type: "STOP_TODO_SPINNER" });
    dispatch({ type: "SUCCESS_UPDATE_TASK", payload: result.data });
    // console.log(result.data);
    return result.data;
  } catch (error) {
    dispatch({ type: "STOP_TODO_SPINNER" });
    const resMessage = error.response.data;
    dispatch({ type: "ERROR_DELETE_TODO", payload: resMessage });
  }
};

export const updateOneTodo = async (dispatch, creds, id) => {
  try {
    dispatch({ type: "CLEAR_TODO_ERRORS" });
    dispatch({ type: "START_TODO_SPINNER" });
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get(token)}`,
    };
    const result = await axios({
      method: "PUT",
      url: `${BASE_URL}/api/todos/${id}`,
      headers: headers,
      data: creds,
    });
    dispatch({ type: "STOP_TODO_SPINNER" });
    dispatch({ type: "SUCCESS_UPDATE_TODO", payload: result.data });
    console.log(result.data);
    return result.data;
  } catch (error) {
    dispatch({ type: "STOP_TODO_SPINNER" });
    const resMessage = error.response.data;
    dispatch({ type: "ERROR_DELETE_TODO", payload: resMessage });
  }
};
