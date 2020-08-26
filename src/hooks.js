import { useState } from "react";
export const useForm = (callback, initState = {}, validate, params = {}) => {
  const [values, setValues] = useState(initState);
  const [errors, setErrors] = useState({});

  if (Object.keys(params).length !== 0 && params.clear_err) {
    if (Object.keys(errors).length !== 0) {
      setErrors({});
    }
  }
  if (Object.keys(params).length !== 0 && params.clear_val) {
    if (Object.keys(values).length !== 0 && values[params.clear_val] !== "") {
      setValues({ ...values, [params.clear_val]: "" });
    }
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    // setErrors(validate(values));
  };
  const handleSubmit = (e) => {
    if (e) {
      e.preventDefault();
    }
    if (Object.keys(validate(values)).length === 0) {
      callback();
      // setValues(initState);
      setErrors({});
    } else {
      setErrors(validate(values));
    }
  };

  // if (params.hasOwnProperty("set_title")) {
  //   // alert("here");
  //   setValues({ ...values, title: "" });
  // }

  return { handleChange, handleSubmit, errors, values };
};

export const useValidateForm = (values) => {
  let errors = {};
  if (values.hasOwnProperty("email") && values.email.trim() === "") {
    errors.email = "Must not be empty";
  }
  if (values.hasOwnProperty("password") && values.password.trim() === "") {
    errors.password = "Must not be empty";
  }
  if (values.hasOwnProperty("first_name") && values.first_name.trim() === "") {
    errors.first_name = "Must not be empty";
  }
  if (values.hasOwnProperty("last_name") && values.last_name.trim() === "") {
    errors.last_name = "Must not be empty";
  }
  if (values.hasOwnProperty("name") && values.name.trim() === "") {
    errors.name = "Must not be empty";
  }
  return errors;
};
