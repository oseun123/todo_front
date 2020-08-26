import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Modal from "./Modals";
import RenderOneTodo from "./RenderOneTodo";
import { createTodo } from "../store/actions/todoActions";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "./helpers/Spinner";
import Message from "./helpers/Message";
import classnames from "classnames";
import { getAllTodos } from "./../store/actions/todoActions";
// import Mini from "./helpers/MiniSpinner";
import { useForm } from "../hooks";
const TodoList = () => {
  const history = useHistory();
  const initTodo = {
    title: "",
  };
  const { is_Loggedin } = useSelector((state) => state.user);
  const { spinner, message, status, todos } = useSelector(
    (state) => state.todo
  );
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [params, setParams] = useState({
    clear_err: false,
    clear_val: "",
  });
  useEffect(() => {
    if (!is_Loggedin) {
      history.push("/");
    }
    // eslint-disable-next-line
    getAllTodos(dispatch);
  }, [is_Loggedin, history, dispatch]);

  const handleShowModal = () => {
    setParams({ ...params, clear_val: "", clear_err: false });
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setParams({ ...params, clear_err: true, clear_val: "title" });
    setShowModal(false);
  };

  // validation
  const validation = (values) => {
    let errors = {};
    if (values.title.trim() === "") {
      errors.title = "Must not be empty";
    }
    return errors;
  };
  // callback
  const createTodoFromForm = () => {
    createTodo(dispatch, values).then((res) => {
      if (res.status === "success") {
        handleCloseModal();
      }
    });
  };
  let { values, errors, handleChange, handleSubmit } = useForm(
    createTodoFromForm,
    initTodo,
    validation,
    params
  );

  return (
    <div className="container">
      {message && status ? <Message message={message} status={status} /> : null}
      {spinner ? <Spinner /> : null}
      {showModal && (
        <Modal
          closeModal={handleCloseModal}
          modal_title={"Create Todo"}
          handle_submit={handleSubmit}
        >
          <input
            type="text"
            name="title"
            value={values.title}
            className={classnames("form-control", {
              "is-invalid": errors.title,
            })}
            placeholder="Enter new Todo"
            onChange={handleChange}
          />
          {errors.title && (
            <div className="invalid-feedback">{errors.title}</div>
          )}
        </Modal>
      )}
      <div className="row text-center ">
        <div className="col-12">
          <h1 className="display-4 my-4">My Todos</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <button
            className="btn btn-primary float-right"
            onClick={handleShowModal}
          >
            New
          </button>
        </div>
      </div>
      <div className="row my-3">
        <div className="col-12">
          <ul className="list-group shadow-sm">
            {todos.length ? (
              todos.map((todo, index) => (
                <RenderOneTodo
                  key={index}
                  title={todo.title}
                  todo_id={todo.id}
                />
              ))
            ) : (
              <li>No current todo </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default TodoList;
