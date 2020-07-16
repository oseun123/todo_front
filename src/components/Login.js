import React, { useEffect } from "react";
import { login, resetUsersState } from "../store/actions/userActions";
import { useForm, useValidateForm } from "../hooks";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "./helpers/Spinner";
import Message from "./helpers/Message";
import Mini from "./helpers/MiniSpinner";
import { useHistory, Link } from "react-router-dom";

const Login = () => {
  const history = useHistory();
  const initLoginUser = {
    email: "",
    password: "",
  };
  const { spinner, message, status, is_Loggedin } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  // validations is in useValidateForm which can be replace with any custom validation
  // callback
  const loginUserFromForm = () => {
    login(dispatch, values);
  };

  const { values, errors, handleChange, handleSubmit } = useForm(
    loginUserFromForm,
    initLoginUser,
    useValidateForm
  );

  // useEffect(() => {}, [values]);
  // eslint-disable-next-line
  useEffect(() => {
    if (is_Loggedin) {
      history.push("/profile");
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
          <form onSubmit={handleSubmit}>
            <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                className={`form-control ${errors.email && "is-invalid"}`}
                value={values.email}
                name="email"
                onChange={handleChange}
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
                className={`form-control  ${errors.password && "is-invalid"}`}
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
              Sign in
              {spinner ? <Mini color="white" /> : null}
            </button>
          </form>

          <Link to="/forget-password"> Forgot password?</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
