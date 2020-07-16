import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../store/actions/userActions";
const Navbar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { is_Loggedin } = useSelector((state) => state.user);

  const log_out = (e) => {
    e.preventDefault();
    logOut(dispatch);
    history.push("/");
  };

  useEffect(() => {
    // console.log(is_Loggedin);
  }, [is_Loggedin]);
  const loginRegLink = (
    <React.Fragment>
      <li className="nav-item">
        <Link to="/login" className="nav-link">
          Login
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/register" className="nav-link">
          Register
        </Link>
      </li>
    </React.Fragment>
  );
  const userLink = (
    <React.Fragment>
      <li className="nav-item">
        <Link to="/profile" className="nav-link">
          Profile
        </Link>
      </li>
      <li className="nav-item">
        <a href="#!" className="nav-link" onClick={log_out}>
          LogOut
        </a>
      </li>
    </React.Fragment>
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
      <div>
        <a className="navbar-brand" href="#!">
          <i>BesTodo</i>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
      </div>
      <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
          <li className="nav-item active">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          {is_Loggedin ? userLink : loginRegLink}
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
