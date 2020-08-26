import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { deleteTodoTask, updateTodoTask } from "../store/actions/todoActions";
import Modal from "./Modals";
import classnames from "classnames";
import { useForm } from "../hooks";

const RenderOneTask = (props) => {
  const { text, id, todo_id, is_completed } = props.task;
  let initTodoTask = {
    text: text,
    is_completed: is_completed,
  };
  // useEffect(() => {
  //   initTodoTask = {
  //     text: text,
  //     is_completed: is_completed,
  //   };
  // }, []);
  const [params, setParams] = useState({
    clear_err: false,
    clear_val: "",
  });
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const handleDelete = (e) => {
    e.preventDefault();
    deleteTodoTask(dispatch, id);
  };
  const handleShowModal = () => {
    setParams({ ...params, clear_val: "", clear_err: false });
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setParams({ ...params, clear_err: true, clear_val: "" });
    setShowModal(false);
  };
  // validation
  const validation = (values) => {
    let errors = {};
    if (values.text.trim() === "") {
      errors.text = "Must not be empty";
    }
    return errors;
  };
  // callback
  const updateTodoTaskFromForm = () => {
    // const val = { ...values, is_completed: JSON.parse(values.is_completed) };
    console.log(values);
    updateTodoTask(dispatch, values, id).then((res) => {
      if (res.status === "success") {
        handleCloseModal();
      }
    });
  };
  // eslint-disable-next-line
  let { values, errors, handleChange, handleSubmit } = useForm(
    updateTodoTaskFromForm,
    initTodoTask,
    validation,
    params
  );
  return (
    <>
      {showModal && (
        <Modal
          closeModal={handleCloseModal}
          modal_title={"Edit Todo Item"}
          handle_submit={handleSubmit}
        >
          <input
            type="text"
            name="text"
            // value={values.text}
            defaultValue={text}
            className={classnames("form-control", {
              "is-invalid": errors.text,
            })}
            placeholder="Eidt Todo Task"
            onChange={handleChange}
          />
          {errors.text && <div className="invalid-feedback">{errors.text}</div>}
          <div className="form-group">
            <label htmlFor="is_completed">Task Completed</label>
            <select
              className="form-control"
              id="is_completed"
              name="is_completed"
              onChange={handleChange}
              defaultValue={is_completed}
            >
              <option value={0}>No</option>
              <option value={1}>Yes</option>
            </select>
          </div>
        </Modal>
      )}
      <li className="list-group-item list-group-item-light">
        <input
          type="checkbox"
          name=""
          id=""
          className="mr-1 mt-1"
          disabled
          checked={is_completed === "0" ? parseInt(is_completed) : is_completed}
        />
        {text}
        <button
          onClick={handleDelete}
          className="btn btn-danger btn-sm float-right mr-1  btn-icon "
        >
          <i className="fas fa-trash-alt"></i>
        </button>
        <button
          className="btn btn-warning btn-sm float-right mr-1 btn-icon "
          onClick={handleShowModal}
        >
          <i className="far fa-edit"></i>
        </button>
      </li>
    </>
  );
};

export default RenderOneTask;
