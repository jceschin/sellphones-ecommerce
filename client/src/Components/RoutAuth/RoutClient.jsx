import React from 'react';
import { useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';

const RoutClient = ({Component, match}) => {
  const {user} = useSelector(state => state.auth);
  const id = match.params.id
  if(!user){
    return <Redirect to={'./login'} />
  }
  return ( 
      <Component id={id} />
   );
}
 
export default RoutClient;