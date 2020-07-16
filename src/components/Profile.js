import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { token, storage_type } from "../config";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    const tok = storage_type.getItem(token);
    const decoded = jwt_decode(tok);
    setProfile({
      name: decoded.id,
      email: decoded.email,
    });
  }, []);
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
