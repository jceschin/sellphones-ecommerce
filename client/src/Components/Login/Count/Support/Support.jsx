import React from 'react';
import "./Support.css";
const CountSupport = () => {
  return (
    <div className="formFormx">
      <h3>SUPPORT</h3>
      <form className="formFormx">
        <label className="labelFormx" for="name">Name:</label>
        <input className="inputFormx" id="name" name="name"  /> <br />
        <label className="labelFormx" for="email">Email:</label>
        <input className="inputFormx" id="email" name="email" type="email"  /><br />
        <label className="labelFormx" for="mensaje">Message:</label>
        <textarea className="textareaFormx" id="msg" name="msg" ></textarea><br />
        <input className="submitFormx" id="submit" name="submit" type="" value="Submit" readOnly />
      </form>
    </div>
  );
}

export default CountSupport;
