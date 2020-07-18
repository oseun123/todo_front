import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { token } from "../config";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Profile = () => {
  const history = useHistory();
  const [profile, setProfile] = useState({
    name: "",
    email: "",
  });
  const { is_Loggedin } = useSelector((state) => state.user);

  useEffect(() => {
    if (!is_Loggedin) {
      history.push("/");
    } else {
      const tok = Cookies.get(token);
      const decoded = jwt_decode(tok);
      setProfile({
        name: decoded.id,
        email: decoded.email,
      });
    }
  }, [history, is_Loggedin]);
  return (
    <div className="container">
      <div className="jumbotron mt-5">
        <div className="col-sm-8 mx-auto">
          <h1 className="text-center">PROFILE</h1>
        </div>
        <table className="table col-md-6 mx-auto">
          <tbody>
            <tr>
              <td> Name</td>
              <td>{profile.name}</td>
            </tr>

            <tr>
              <td>Email</td>
              <td>{profile.email}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Profile;
