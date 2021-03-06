import React, { useState , useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";


export default function ForgotReset(props) {
  const [password, setPassword] = useState();
  const [message, setmessage] = useState("");
  const [valid ,setValid] = useState(false);
  const [userid ,setUserid] = useState('');

  const history = useHistory();



  useEffect(() => {
    var search = props.location.search;
    var token = search.substring(1);
    console.log(token);
    axios
      .post('http://localhost:4000/emailforgot/reset', { token: token })
      .then((res) => {
        if(res.data.message=='linkok'){
            setValid(true);
            setUserid(res.data.id);
        }

      })

  }, []);


  function handleChange(e) {
    setPassword(e.target.value);
  }



  function postpassword() {
    axios
      .post("http://localhost:4000/user/passwordresetforgot", {password: password ,id: userid}).then(function(response){
        window.localStorage.removeItem("token");
        window.location.replace("/");
      })
  }



  if (valid===true){
  return (
    <div className="add-category-container">

      <form  className="create-category-content">
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">New Password</label>
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
      <button onClick={postpassword} class="btn btn-primary my-4">
        Change Password
      </button>
    </div>
  );
  }
else{
  return(
    <div><p>Link Invalido o Expirado</p></div>
  );
}
}
