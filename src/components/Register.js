import React, { useEffect } from "react";
import { register, resetUsersState } from "../store/actions/userActions";
import { useForm, useValidateForm } from "../hooks";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "./helpers/Spinner";
import Message from "./helpers/Message";
import Mini from "./helpers/MiniSpinner";
import { useHistory } from "react-router-dom";

const Register = () => {
  const history = useHistory();
  const initRegisterUser = {
    name: "",
    email: "",
    password: "",
  };
  const { spinner, message, status, is_Loggedin } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  // validations is in useValidateForm which can be replace with any custom validation
  // callback
  const registerUserFromForm = () => {
    register(dispatch, values).then((res) =>
      res.data.status === "success" ? history.push("/todos") : null
    );
  };

  const { values, errors, handleChange, handleSubmit } = useForm(
    registerUserFromForm,
    initRegisterUser,
    useValidateForm
  );

  // useEffect(() => {}, [values]);
  //eslint - disable - next - line;
  useEffect(() => {
    if (is_Loggedin) {
      history.push("/todos");
    }
    return () => {
      resetUsersState(dispatch);
    };
  }, [dispatch, history, is_Loggedin]);
  return (
    <div className="container">
      {message && status ? <Message message={message} status={status} /> : null}
      {spinner ? <Spinner /> : null}
      <div className="row">
        <div className="col-md-6 mt-5 mx-auto">
          <form noValidate onSubmit={handleSubmit}>
            <h1 className="h3 mb-3 font-weight-normal">Register</h1>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className={`form-control ${errors.name && "is-invalid"}`}
                value={values.name}
                onChange={handleChange}
                name="name"
                placeholder="Enter full name"
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                className={`form-control ${errors.email && "is-invalid"}`}
                value={values.email}
                onChange={handleChange}
                name="email"
                placeholder="Enter Email"
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className={`form-control ${errors.password && "is-invalid"}`}
                value={values.password}
                onChange={handleChange}
                name="password"
                placeholder="Enter Password"
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>
            <button type="submit" className="btn btn-primary btn-lg btn-block">
              Register
              {spinner ? <Mini color="white" /> : null}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
