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
      .post(`/orders/cart`, { id: user.id }) //http://localhost:4000
      .then((res) => {
        axios.post(`/orders/cart/${res.data}`, { //http://localhost:4000
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
