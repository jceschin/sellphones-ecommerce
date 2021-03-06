import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "./cartInvite.css";
import ItemCartInvite from "../itemCart/ItemCartInvite";
import { NavDropdown, Dropdown, Button } from "react-bootstrap";

const CartInvite = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { TotalOrden } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const history = useHistory();

  useEffect(() => {}, []);

  //preguntar para despues de la compra del carrito

  function cartContinue() {
    console.log(history);
    if (user) {
      //lo manda a completar la compra
    } else {
      console.log("aqui redirect");
      history.push("/");
    }
  }

  return (
    <div className=" cart-invnt container d-flex">
        <div className="col-12">
          <h3>Shopping Cart</h3>
          <hr />
          <table className="table">
            <thead >
              <tr className="text-center">
                <th scope="col">Product</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Stock</th>
                <th scope="col">Total</th>
                <th scope="col"> Delete </th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((product, index) => {
                return <ItemCartInvite key={index} product={product} />;
              })}
            </tbody>
          </table>
        </div>
        <div className="col-2 content-pay-inv">
          <h3> Subtotal: <span>{TotalOrden}</span> </h3>
          <div className="bot-button-inv">
            <button onClick={() => cartContinue()}> Next </button>
            <button> Cancel </button>
          </div>
        </div>
    </div>
  );
};

export default CartInvite;
