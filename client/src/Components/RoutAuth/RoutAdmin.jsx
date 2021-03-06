import React from 'react';
import { useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';

const RoutAdmin = ({Component, match}) => {
  const {user} = useSelector(state => state.auth);
  let id = match.params.id;

  if(user && user.isAdmin){
    return <Component id={id}/>
  }
  else if(user){
    return <div>No</div>
  }
  return ( 
    <Redirect to={'./login'} />
  );
}
 
export default RoutAdmin;