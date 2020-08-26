import React, { useState, useEffect } from "react";
import RenderOneTask from "./RenderOneTask";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteOneTodo,
  updateOneTodo,
  addTodoItem,
} from "../store/actions/todoActions";
import Modal from "./Modals";
import classnames from "classnames";
import { useForm } from "../hooks";

const RenderOneTodo = ({ title, todo_id }) => {
  const initTodo = {
    title,
  };
  const initTodoItem = {
    text: "",
  };
  const [params, setParams] = useState({
    clear_err: false,
    clear_val: "",
  });
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const { todos } = useSelector((state) => state.todo);
  const [todoItems, setTodoItems] = useState([]);
  useEffect(() => {
    // console.log(todos);
    // console.log(todo_id);
    if (todos.length) {
      const oneTodo = todos.find((item) => item.id === todo_id);
      setTodoItems([...oneTodo.todo_items]);
    }
  }, [todos, todo_id]);

  const handleShowModal = () => {
    setParams({ ...params, clear_val: "", clear_err: false });
    setShowModal(true);
  };
  const handleShowModal1 = () => {
    setParams({ ...params, clear_val: "", clear_err: false });
    setShowModal1(true);
  };
  const handleCloseModal = () => {
    setParams({ ...params, clear_err: true, clear_val: "title" });
    setShowModal(false);
  };
  const handleCloseModal1 = () => {
    setParams({ ...params, clear_err: true, clear_val: "text" });
    setShowModal1(false);
  };
  // validation
  const validation = (values) => {
    let errors = {};
    if (values.title.trim() === "") {
      errors.title = "Must not be empty";
    }
    return errors;
  };
  // validation
  const validationItem = (values1) => {
    let errors1 = {};
    if (values1.text.trim() === "") {
      errors1.text = "Must not be empty";
    }
    return errors1;
  };
  // callback
  const updateTodoFromForm = () => {
    // console.log(values);
    updateOneTodo(dispatch, values, todo_id).then((res) => {
      if (res.status === "success") {
        handleCloseModal();
      }
    });
  };
  // callback
  const addTodoItemFromForm = () => {
    addTodoItem(dispatch, objj.values, todo_id).then((res) => {
      if (res.status === "success") {
        handleCloseModal1();
      }
    });
  };
  // eslint-disable-next-line
  let { values, errors, handleChange, handleSubmit } = useForm(
    updateTodoFromForm,
    initTodo,
    validation,
    params
  );

  let objj = useForm(addTodoItemFromForm, initTodoItem, validationItem, params);

  const handleDelete = (e) => {
    e.preventDefault();
    deleteOneTodo(dispatch, todo_id);
  };
  return (
    <>
      {showModal && (
        <Modal
          closeModal={handleCloseModal}
          modal_title={"Edit Todo"}
          handle_submit={handleSubmit}
        >
          <input
            type="text"
            name="title"
            // value={values.title}
            defaultValue={title}
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
      {showModal1 && (
        <Modal
          closeModal={handleCloseModal1}
          modal_title={"Add TodoItem"}
          handle_submit={objj.handleSubmit}
        >
          <input
            type="text"
            name="text"
            value={objj.values.text}
            className={classnames("form-control", {
              "is-invalid": objj.errors.text,
            })}
            placeholder="Enter new Todo Item"
            onChange={objj.handleChange}
          />
          {objj.errors.text && (
            <div className="invalid-feedback">{objj.errors.text}</div>
          )}
        </Modal>
      )}
      {/* {console.log(values1)} */}
      <li className="list-group-item ">
        <span className="lead">{title}</span>
        <button
          className="btn btn-danger btn-sm float-right mr-1  btn-icon "
          onClick={(e) => handleDelete(e)}
        >
          <i className="fas fa-trash-alt"></i>
        </button>
        <button
          className="btn btn-warning btn-sm float-right mr-1 btn-icon "
          onClick={handleShowModal}
        >
          <i className="far fa-edit"></i>
        </button>
        <button
          className="btn btn-primary btn-sm float-right mr-1 btn-icon "
          onClick={handleShowModal1}
        >
          <i className="fas fa-plus-circle"></i>
        </button>
        <ul className="list-group  list-group-flush  my-3 w-75 mx-auto">
          {todoItems.length
            ? todoItems.map((item, index) => (
                <RenderOneTask key={index} task={item} />
              ))
            : null}
        </ul>
      </li>
    </>
  );
};
export default RenderOneTodo;
