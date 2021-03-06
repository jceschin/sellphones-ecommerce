import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { itemCartAdd } from "../../store/Actions/Product_Actions";
import "./AddToCart.css";
import axios from "axios";

//Test

const AddToCart = (props) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch()

  function addToCart(id) {
    axios
      .post(`http://localhost:4000/orders/cart`, { id: user.id })
      .then((res) => {
        axios.post(`http://localhost:4000/orders/cart/${res.data}`, {
          idproduct: id,
        });
      })
      .then(res =>{
        dispatch(itemCartAdd(user.id))
      });
      
  }

  return (
    <button
      onClick={() => {
        addToCart(props.id);
      }}
      type="button"
      disabled={props.btnDisabled}
    >
      <strong>ADD TO CART</strong>
    </button>
  );
};

export default AddToCart;
