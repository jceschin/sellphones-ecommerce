import React from 'react';
import { Switch, useHistory, Route, useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import PasswordReset from "../../../PasswordReset/PasswordReset.jsx";
import { Avatar } from "rsuite";
import './Settings.css'

const CountSettings = () => {
  const user = useSelector((state) => state.auth.user);
  let { url } = useRouteMatch();
  let history = useHistory();

  return (
    <div className='div-settings-cont'>
      <Avatar
        circle
        size="lg"
        src={user.photoURL || "https://hajiri.co/uploads/no_image.jpg"}
        className="avatar-img-setttings "
      />
      <table className='div-settings-gen-user'>
        <tr>
          <td> <h2>Given Name: </h2></td>
          <td> <span> { user.givenName }</span> </td>
        </tr>
        <tr>
          <td> <h2>Family Name: </h2></td>
          <td> <span> { user.familyName }</span> </td>
        </tr>
        <tr>
          <td> <h2>Email: </h2></td>
          <td> <span> { user.email }</span> </td>
        </tr>
        <tr className='change-pass-table'>
          <td> <h4>¿Do you want to change your password? </h4></td>
          <td> <span onClick={() => history.push(url + "/passwordreset")}>Click me</span> </td>
        </tr>
      </table>
      <div className="conten-pass-reset">
        <Switch>
          <Route path={url + "/passwordreset"}>
            <PasswordReset />
          </Route>
        </Switch>
      </div>
    </div>
   );
}

export default CountSettings;
