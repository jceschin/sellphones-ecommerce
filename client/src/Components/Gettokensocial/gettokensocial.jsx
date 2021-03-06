import React, { useEffect,useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import jwt from "jsonwebtoken";
const queryString = require('query-string');

export default function Gettokensocial(props) {



  useEffect(() => {
   if(props.location.search){
    var search = props.location.search;
    var token = search.substring(1);
    window.localStorage.setItem("token", token);
    window.location.replace("/");}
  }, []);



  

  // el prevent default sirve para q no recargue la pagina con el primer post
  return (
    <div >

    </div>
  );
}
