import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";


export default function ForgotPassword() {
  const [email, setEmail] = useState();
  const [message, setmessage] = useState("");





  function handleChange(e) {
    setEmail(e.target.value);
  }



  function sendemail() {


    axios
      .post('http://localhost:4000/emailforgot/forgotPassword', { email: email })
      .then((res) => {

      })


  }

  // el prevent default sirve para q no recargue la pagina con el primer post
  return (
    <div className="add-category-container">
      {/* <h3>Add new category</h3> */}
      <form  className="create-category-content">
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Email</label>
          <div class="col-sm-10">
            <input
              class="form-control"
              placeholder="Insert category name"
              onChange={(e) => {
                handleChange(e);
              }}
              name="name"
              type="text"
              required
            />

          </div>
        </div>


      </form>
      <p>{message}</p>
      <button onClick={sendemail} class="btn btn-primary my-4">
        Send Recuperation Email
      </button>
    </div>
  );
}
