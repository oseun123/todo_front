import React, { useEffect, useRef } from "react";
import { resetPassword, resetUsersState } from "../store/actions/userActions";
import { useForm, useValidateForm } from "../hooks";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "./helpers/Spinner";
import Message from "./helpers/Message";
import Mini from "./helpers/MiniSpinner";
import { useHistory, Link } from "react-router-dom";
import jwt_decode from "jwt-decode";

const ResetPassword = (props) => {
  const history = useHistory();
  const emailRef = useRef(null);
  const params = props.match.params;
  let initPassword = {
    password: "",
  };
  const { spinner, message, status, is_Loggedin } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  // validations is in useValidateForm which can be replace with any custom validation
  // callback
  const RequestPasswordFromForm = () => {
    resetPassword(dispatch, { ...values, token: params.token });
  };

  const { values, errors, handleChange, handleSubmit } = useForm(
    RequestPasswordFromForm,
    initPassword,
    useValidateForm
  );

  //   useEffect(() => {}, [values]);
  // eslint-disable-next-line
  useEffect(() => {
    if (is_Loggedin) {
      history.push("/profile");
    }

    const { email } = jwt_decode(params.token);
    emailRef.current.value = email;

    return () => {
      resetUsersState(dispatch);
    };
  }, [dispatch, history, is_Loggedin, params]);

  return (
    <div className="container">
      {message && status ? <Message message={message} status={status} /> : null}
      {spinner ? <Spinner /> : null}
      <div className="row">
        <div className="col-md-6 mt-5 mx-auto">
          <form onSubmit={handleSubmit}>
            <h1 className="h3 mb-3 font-weight-normal text-center">
              Reset your password
            </h1>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                className={`form-control ${errors.email && "is-invalid"}`}
                value={values.email}
                name="email"
                onChange={handleChange}
                placeholder="Enter Email"
                readOnly
                ref={emailRef}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="password"> New Password</label>
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
              Reset
              {spinner ? <Mini color="white" /> : null}
            </button>
          </form>

          <Link to="/login"> Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
