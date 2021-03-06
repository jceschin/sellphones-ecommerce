import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./PasswordReset.css";

export default function PasswordReset() {
  const [password, setPassword] = useState();
  const [oldpassword, setOldPassword] = useState();
  const [message, setmessage] = useState("");

  const { user } = useSelector((state) => state.auth);

  const history = useHistory();

  function handleChange(e) {
    setPassword(e.target.value);
  }

  function handleChangeOld(e) {
    setOldPassword(e.target.value);
  }

  function postpassword() {
    axios
      .post("http://localhost:4000/user/passwordreset", {oldpassword: oldpassword, password: password ,id: user.id})
      .then(function (response) {
        if(response.data.mensaje==="Incorrect")
        {
          setmessage('Incorrect Actual Password');
          setPassword('');
          setOldPassword('');
        }
        if(response.data.mensaje==="Good")
        {
          setmessage('Password Changed');
          setPassword('');
          setOldPassword('');
        }


          });
  }

  // el prevent default sirve para q no recargue la pagina con el primer post
  return (
    <div className="form-pass-log">
      <form  className="formFormx in-form-pass">
          <label class="col-sm-2 labelFormx label-in-pass">Actual Password</label>
          <input
            class=" in-pass-input"
            placeholder="Insert Actual Password"
            onChange={(e) => {
              handleChangeOld(e);
            }}
            name="name"
            type="text"
            required
          />
          <label class="col-sm-2 labelFormx label-in-pass">New Password</label>
            <input
              class="in-pass-input"
              placeholder="Insert New Password"
              onChange={(e) => {
                handleChange(e);
              }}
              name="name"
              type="text"
              required
            />
      </form>
      <p>{message}</p>
      <button onClick={postpassword} class=" in-butt-pass">
        Change Password
      </button>
    </div>
  );
}
